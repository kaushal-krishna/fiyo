import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavStack from "./layout/NavStack";

function App() {
  return (
    <div className="flex min-h-screen bg-body-bg dark:bg-body-bg-dark">
      <NavStack />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <img
              src="https://colibriwp.com/blog/wp-content/uploads/2019/07/2488756.jpg"
              className="w-10/12 h-10/12 m-auto"
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
