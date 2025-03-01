import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { fiyochatSrvBaseUri } from "../../constants.js";
import UserContext from "./UserContext";
import { getBulkUsers } from "../../hooks/useUserUtils.js";
import { refreshAccessToken } from "../../hooks/useTokenUtils.js";
import {
  initializeMessageStock,
  updateMessageStocks,
  getLastLog,
} from "../../hooks/useChatUtils.js";
import { io } from "socket.io-client";

const SOCKET_URL = fiyochatSrvBaseUri;
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { userInfo, isUserAuthenticated } = useContext(UserContext);

  const [socketUser, setSocketUser] = useState({
    id: null,
  });

  const [sessionMessageStocks, setSessionMessageStocks] = useState({});
  const [inboxItems, setInboxItems] = useState([]);

  const socketRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!isUserAuthenticated) {
      if (socketRef.current) {
        console.log("Disconnecting socket for unauthenticated user");
        socketRef.current?.disconnect();
        socketRef.current = null;
      }
      return;
    }

    if (!socketRef.current) {
      console.log("Creating new socket connection");
      socketRef.current = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"],
        auth: {
          fiyoat: userInfo?.headers?.fiyoat,
          fiyodid: userInfo?.headers?.fiyodid,
        },
      });

      if (!initialized.current) {
        socketRef.current?.on("connect", () => {
          console.log("Socket Connected:", socketRef.current?.id);
          setSocketUser(prevState => ({
            ...prevState,
            id: socketRef.current?.id,
          }));
        });

        socketRef.current?.on("roomsListResponse", async response => {
          const inboxItems = await Promise.all(
            response.map(async room => {
              if (room.roomDetails.type !== "private") {
                return room;
              }

              const lastLog = await getLastLog(room.messageStock, userInfo.id);

              const existingMessageStocks = sessionMessageStocks || {};

              const updatedMessageStocks = {
                ...existingMessageStocks,
                [room.roomDetails.id]: room.messageStock,
              };

              setSessionMessageStocks(updatedMessageStocks);

              room.lastLog = lastLog;
              delete room.messageStock;

              return room;
            }),
          );

          const recipientUserIds = response.flatMap(room =>
            room.roomDetails.members
              .filter(member => member !== userInfo.id)
              .map(member => member),
          );

          const recipientUsers = await getBulkUsers(recipientUserIds);

          inboxItems.forEach(item => {
            item.recipientUser = recipientUsers.find(
              user =>
                item.roomDetails.members.includes(user.id) &&
                user.id !== userInfo.id,
            );
          });

          setInboxItems(inboxItems);
        });

        socketRef.current?.on("message_received", async response => {
          const { id, senderId, content, type, roomId, sentAt } = response;

          const messageStock = initializeMessageStock(roomId);
          const newMessage = {
            senderId,
            content,
            id,
            type,
            sentAt,
          };
          messageStock.messages.push(newMessage);

          const updatedStock = updateMessageStocks(roomId, messageStock);

          const lastLog = await getLastLog(updatedStock, userInfo.id);
          setInboxItems(prev =>
            prev.map(item =>
              item?.roomDetails?.id === roomId ? { ...item, lastLog } : item,
            ),
          );
        });

        socketRef.current?.on("message_seen", async response => {
          const { id, senderId, roomId, seenAt } = response;

          const messageStock = initializeMessageStock(roomId);

          const senderIndex = messageStock.seenBy.findIndex(
            user => user.userId === senderId,
          );

          if (senderIndex !== -1) {
            messageStock.seenBy[senderIndex].lastSeenMessageId = id;
            messageStock.seenBy[senderIndex].seenAt = seenAt;
          } else {
            messageStock.seenBy.push({
              userId: senderId,
              lastSeenMessageId: id,
              seenAt,
            });
          }

          const updatedStock = updateMessageStocks(roomId, messageStock);

          const lastLog = await getLastLog(updatedStock, userInfo.id);
          setInboxItems(prev =>
            prev.map(item =>
              item?.roomDetails?.id === roomId ? { ...item, lastLog } : item,
            ),
          );
        });

        socketRef.current?.on("error", async response => {
          if (response.error.name === "ATInvalidError") {
            refreshAccessToken();
          }
        });

        socketRef.current?.on("disconnect", response => {
          console.log("Socket Disconnected:", socketRef.current?.id);
        });

        initialized.current = true;
      }
    }

    localStorage.setItem(
      "sessionMessageStocks",
      JSON.stringify(sessionMessageStocks),
    );

    return () => {
      localStorage.removeItem("sessionMessageStocks");
    };
  }, [isUserAuthenticated, userInfo, sessionMessageStocks]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        socketUser,
        inboxItems,
        setInboxItems,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;