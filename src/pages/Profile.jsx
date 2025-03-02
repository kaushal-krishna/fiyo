import React from "react";
import Suggestions from "../components/app/Suggestions";

const Profile = () => {
  return (
    <div className="flex justify-center mx-auto w-full">
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full md:px-6 gap-6">
        <div className="flex-1 lg:w-2/3">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p>This is the profile page.</p>
        </div>
        <div className="flex-1 hidden lg:block lg:w-1/3">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Profile;
