import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import UserContext from "../context/items/UserContext";
import { getUser } from "../hooks/useUserUtils.js";
import CustomTopNav from "../layout/items/CustomTopNav";
import Suggestions from "../components/app/Suggestions";
import { NotFound404 } from "./index.js";
import {
  getUserFollowers,
  getUserFollowing,
  getUserMates,
  sendFollowRequest,
  unsendFollowRequest,
  sendMateRequest,
  unsendMateRequest,
} from "../hooks/useConnectionUtils.js";

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const { username } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Default to null for easier 404 check
  const [followBtnText, setFollowBtnText] = useState("");
  const [mateBtnText, setMateBtnText] = useState("");

  useEffect(() => {
    setLoading(true);
    getUser(username)
      .then((userData) => {
        if (userData?.status === 404) {
          setUser(null); // Set user to null on 404
        } else {
          setUser(userData);
          setFollowBtnText(
            userData?.relation?.follow?.follow_status === "accepted"
              ? "Following"
              : userData?.relation?.follow?.follow_status === "pending"
              ? "Requested"
              : "Follow"
          );
          setMateBtnText(
            userData?.relation?.follow?.mate_status === "accepted"
              ? "Already Mates"
              : userData?.relation?.follow?.mate_status === "pending"
              ? "Requested"
              : "Commate"
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setUser(null); // Handle any error as a 404-like case
        setLoading(false);
      });

    return () => {
      setUser(null);
    };
  }, [username]);

  const handleFollowBtnClick = () => {
    followBtnText === "Follow"
      ? sendFollowRequest(user?.id).then(() => setFollowBtnText("Requested"))
      : unsendFollowRequest(user?.id).then(() => setFollowBtnText("Follow"));
  };

  const handleMateBtnClick = () => {
    mateBtnText === "Commate"
      ? sendMateRequest(user?.id).then(() => setMateBtnText("Requested"))
      : unsendMateRequest(user?.id).then(() => setMateBtnText("Commate"));
  };

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Show 404 page if user is null (indicating not found)
  if (!user) {
    return (
      <div className="flex justify-center mx-auto w-full min-h-screen">
        <div className="flex flex-col lg:flex-row max-w-7xl w-full px-4 md:px-6 gap-6">
          <div className="flex-1 lg:w-2/3 w-full">
            <div className="flex flex-col w-full max-w-3xl mx-auto py-6">
              <NotFound404 />
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/3">
            <Suggestions />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mx-auto w-full min-h-screen">
      <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-6">
        <div className="flex-1 lg:w-2/3 w-full">
          <div className="flex flex-col w-full max-w-3xl mx-auto">
            <CustomTopNav
              prevPage={userInfo?.username === user?.username ? null : "GoBack"}
              title={user?.username}
              rightIcons={[
                {
                  resource: <FaEllipsisVertical />,
                  onClick: () => {},
                },
              ]}
            />
            <img
              src={user?.banner}
              className="w-full h-48 object-cover bg-primary-bg dark:bg-primary-bg-dark"
              alt="Profile Banner"
            />
            <div className="px-6">
              <div className="flex flex-row items-center justify-between bg-gray-100 dark:bg-secondary-bg-dark rounded-3xl px-6 py-4 gap-6 -mt-16 w-full h-40">
                <div className="flex-shrink-0">
                  <img
                    src={user?.avatar}
                    className="w-24 h-24 aspect-square rounded-full object-cover bg-tertiary-bg dark:bg-tertiary-bg-dark"
                    alt="Profile Avatar"
                  />
                </div>
                <div className="flex-1 h-full">
                  <div className="flex flex-row items-center justify-around h-1/2 w-full">
                    <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
                      <span className="text-xl text-center font-bold">
                        {user?.posts_count || 0}
                      </span>
                      <span className="text-sm text-center text-gray-400">
                        Posts
                      </span>
                    </div>
                    <button
                      className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                      onClick={() =>
                        getUserFollowers(user?.id).then((res) =>
                          console.log(res)
                        )
                      }
                    >
                      <span className="text-xl text-center font-bold">
                        {user?.followers_count || 0}
                      </span>
                      <span className="text-sm text-center text-gray-400">
                        Followers
                      </span>
                    </button>
                    <button
                      className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                      onClick={() =>
                        getUserFollowing(user?.id).then((res) =>
                          console.log(res)
                        )
                      }
                    >
                      <span className="text-xl text-center font-bold">
                        {user?.following_count || 0}
                      </span>
                      <span className="text-sm text-center text-gray-400">
                        Following
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-between h-1/2 w-full gap-2 sm:gap-4 mt-2">
                    {userInfo?.username === user?.username ? (
                      <button className="flex-1 bg-tertiary-bg dark:bg-tertiary-bg-dark rounded-full py-2 text-md text-center hover:bg-quaternary-bg dark:hover:bg-quaternary-bg-dark cursor-pointer transition">
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        className={`flex-1 rounded-full py-2 text-md text-center text-white ${
                          followBtnText === "Follow"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-tertiary-bg dark:bg-tertiary-bg-dark hover:bg-quaternary-bg dark:hover:bg-quaternary-bg-dark"
                        } cursor-pointer transition`}
                        onClick={handleFollowBtnClick}
                      >
                        {followBtnText}
                      </button>
                    )}
                    {userInfo?.username === user?.username ? (
                      <button
                        className="flex-1 bg-tertiary-bg dark:bg-tertiary-bg-dark rounded-full py-2 text-md text-center hover:bg-quaternary-bg dark:hover:bg-quaternary-bg-dark cursor-pointer transition"
                        onClick={() =>
                          getUserMates().then((res) => console.log(res))
                        }
                      >
                        Your Mates
                      </button>
                    ) : (
                      <button
                        className={`flex-1 rounded-full py-2 text-md text-center text-white ${
                          mateBtnText === "Commate"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-tertiary-bg dark:bg-tertiary-bg-dark hover:bg-quaternary-bg dark:hover:bg-quaternary-bg-dark"
                        } cursor-pointer transition`}
                        onClick={handleMateBtnClick}
                      >
                        {mateBtnText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/3">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Profile;
