import React from "react";
import { Routes, Route } from "react-router-dom";
import NavStack from "./layout/NavStack";
import { Home, Explore, Profile, NotFound404 } from "./pages";

function App() {
  return (
    <div className="flex min-h-screen bg-body-bg dark:bg-body-bg-dark">
      <NavStack />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
