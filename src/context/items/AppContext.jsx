import { createContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [contentQuality, setContentQuality] = useState(() => {
    return localStorage.getItem("contentQuality") || "normal";
  });
  const [connectedToInternet, setConnectedToInternet] = useState(() => {
    return navigator.onLine; // Web API for initial connection status
  });

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => setConnectedToInternet(true);
    const handleOffline = () => setConnectedToInternet(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAppLoading(false);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("contentQuality") !== contentQuality) {
      localStorage.setItem("contentQuality", contentQuality);
    }
  }, [contentQuality]);

  return (
    <AppContext.Provider
      value={{
        isAppLoading,
        setIsAppLoading,
        contentQuality,
        setContentQuality,
        connectedToInternet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;