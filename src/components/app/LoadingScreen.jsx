import React from "react";
import splashImage from "../../assets/images/splash.png";

const LoadingScreen = () => {
  const width = window.innerWidth;

  return (
    <div className={`flex flex-1 justify-center items-center h-screen`}>
      <img
        src={splashImage}
        alt="Loading"
        className="w-full h-auto"
        style={{ width: width, objectFit: "contain" }}
      />
    </div>
  );
};

export default LoadingScreen;
