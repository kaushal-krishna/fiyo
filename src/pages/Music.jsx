import React from "react";

const Music = () => {
  return (
    <div className="flex justify-center mx-auto w-full">
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full md:px-6 gap-6">
        <div className="flex-1 lg:w-2/3 bg-green-500 w-full h-full">
          MUSIC
        </div>
        <div className="flex-1 hidden lg:block lg:w-1/3 bg-blue-700 w-full h-full"></div>
      </div>
    </div>
  );
};

export default Music;
