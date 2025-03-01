import React from "react";
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
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="flex flex-col items-center xl:items-start left-0 top-0 sticky min-w-20 xl:w-80 xl:pl-6  gap-8 p-2 border-r border-gray-800 h-screen text-black dark:text-white bg-body-bg dark:bg-body-bg-dark">
      <img
        src="https://cdnfiyo.github.io/img/logos/flexiyo.png"
        className="mb-2 max-w-16 p-2 xl:hidden"
        alt="Flexiyo"
      />
      <span className="p-2 mx-2 text-2xl font-bold hidden xl:block">Flexiyo</span>
      {[
        { to: "/", icon: HomeIcon, label: "Home" },
        { to: "/search", icon: SearchIcon, label: "Search" },
        {
          to: "/music",
          icon: MusicIcon,
          label: "Music",
          extraProps: { isAudioPlaying: true },
        },
        { to: "/clips", icon: ClipsIcon, label: "Clips" },
        { to: "/create", icon: CreateIcon, label: "Create" },
        {
          to: "/notifications",
          icon: NotificationsIcon,
          label: "Notifications",
        },
        { to: "/direct/inbox", icon: ChatIcon, label: "Messages" },
        {
          to: "/profile",
          icon: ProfileIcon,
          label: "Profile",
          extraProps: { avatar: "https://i.pravatar.cc/200?img=1" },
        },
      ].map(({ to, icon: Icon, label, extraProps }) => (
        <NavLink key={to} to={to} className="flex items-center gap-4">
          {({ isActive }) => (
            <>
              <Icon focused={isActive} {...extraProps} />
              <span className={`hidden xl:block ${isActive && "font-bold"}`}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default SideNav;
