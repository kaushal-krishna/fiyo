import React, { useState, useEffect } from "react";
import SideNav from "./items/SideNav";
import BottomNav from "./items/BottomNav";

const NavStack = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  const noBottomNavRoutes = [
    "/create",
    "/direct/inbox",
    "/direct/t/:id",
    "/notifications",
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        !noBottomNavRoutes.includes(window.location.pathname) && <BottomNav />
      ) : (
        <SideNav />
      )}
    </>
  );
};

export default NavStack;
