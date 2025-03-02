import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import MusicContext from "../../context/items/MusicContext";
import {
  HomeIcon,
  SearchIcon,
  MusicIcon,
  ClipsIcon,
  CreateIcon,
  NotificationsIcon,
  ChatIcon,
  ProfileIcon,
} from "../../icons";

const BottomNav = () => {
  const { isAudioPlaying } = useContext(MusicContext);
  return (
    <div className="fixed flex justify-around items-center w-full bottom-0 text-black dark:text-white bg-body-bg dark:bg-body-bg-dark h-14 border-t border-gray-800">
      {[
        { to: "/", icon: HomeIcon },
        { to: "/search", icon: SearchIcon },
        {
          to: "/music",
          icon: MusicIcon,
          extraProps: { isAudioPlaying },
        },
        { to: "/clips", icon: ClipsIcon, label: "Clips" },
        {
          to: "/profile",
          icon: ProfileIcon,
          extraProps: {
            avatar:
              "https://cdnfiyo.github.io/img/user/avatars/default-avatar.jpg",
          },
        },
      ].map(({ to, icon: Icon, extraProps }) => (
        <NavLink key={to} to={to} className="flex items-center gap-4">
          {({ isActive }) => <Icon focused={isActive} {...extraProps} />}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
