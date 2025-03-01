import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavStack from "./layout/NavStack";
import NotFound404 from "./pages/NotFound404";

function App() {
  return (
    <div className="flex min-h-screen bg-body-bg dark:bg-body-bg-dark">
      <NavStack />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
