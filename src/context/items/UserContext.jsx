import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "65ec8b2e-0d5e-4c5b-8c2e-0d5e4c5b8c2e",
    username: "kaushal",
    full_name: "Kaushal Krishna",
    avatar: "https://cdnfiyo.github.io/img/user/profile/default-avatar.png",
    banner: "https://cdnfiyo.github.io/img/user/profile/default-banner.png",
  });
  const [loading, setLoading] = useState(true);

  const savedUserInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo));
          setIsUserAuthenticated(true);
        } else {
          setUserInfo(null);
          setIsUserAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to load user data from localStorage", error);
      }
      setLoading(false);
    };

    loadUserData();
  }, [savedUserInfo]);

  const saveUserInfo = (userData) => {
    try {
      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUserInfo(userData);
      setIsUserAuthenticated(true);
    } catch (error) {
      console.error("Failed to save user data to localStorage", error);
    }
  };

  const clearUserInfo = () => {
    try {
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      setIsUserAuthenticated(false);
    } catch (error) {
      console.error("Failed to clear user data from localStorage", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isUserAuthenticated,
        setIsUserAuthenticated,
        userInfo,
        loading,
        setLoading,
        saveUserInfo,
        clearUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
