import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomTopNav = ({
  prevPage,
  logoImage,
  logoStyle = "",
  title,
  midComponent,
  rightIcons = [],
  className = "",
  header,
  headerHeight = 0,
}) => {
  const navigate = useNavigate();
  const customTabsHeight = headerHeight + 70;

  return (
    <div
      className={`flex flex-col border-b border-gray-700 w-full sticky top-0 z-50 ${className}`}
      style={{height: customTabsHeight }}
    >
      <div className="flex flex-row items-center h-[70px] w-full px-4 gap-4 bg-body-bg dark:bg-body-bg-dark">
        {prevPage && (
          <button
            onClick={() =>
              prevPage === "GoBack" ? navigate(-1) : navigate(prevPage)
            }
          >
            <FaArrowLeft
              size={25}
              className="text-black dark:text-white cursor-pointer"
            />
          </button>
        )}

        {logoImage && (
          <img
            src={logoImage}
            alt="Logo"
            className={`w-12 h-12 ml-2 ${logoStyle}`}
          />
        )}

        {title && (
          <h1 className="text-2xl font-bold text-primary-text dark:text-primary-text-dark">
            {title}
          </h1>
        )}

        <div className="flex-1 flex items-center justify-center">
          {midComponent}
        </div>

        {rightIcons.length > 0 && (
          <div className="flex flex-row items-center gap-8">
            {rightIcons.map((icon, index) => (
              <button key={index} className="cursor-pointer" onClick={icon.onPress}>
                {icon.resource}
              </button>
            ))}
          </div>
        )}
      </div>
      {header && header}
    </div>
  );
};

export default CustomTopNav;
