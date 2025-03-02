import React from "react";
import { Routes, Route } from "react-router-dom";
import NavStack from "./layout/NavStack";
import { Home, Search, Music, Profile, NotFound404 } from "./pages";

function App() {
  return (
    <div className="flex min-h-screen">
      <NavStack />
      <main className="w-full bg-body-bg dark:bg-body-bg-dark text-black dark:text-white pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/music" element={<Music />} />
          <Route path="/u/:username" element={<Profile />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
