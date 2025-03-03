import React from "react";

const LoadingScreen = () => {
  const width = window.innerWidth;

  return (
    <div className={`flex flex-1 justify-center items-center h-screen`}>
      <img
        src="../../assets/images/splash.png"
        alt="Loading"
        className="w-full h-auto"
        style={{ width: width, objectFit: "contain" }}
      />
    </div>
  );
};

export default LoadingScreen;
