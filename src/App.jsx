import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./context/items/UserContext";
import NavStack from "./layout/NavStack";
import {
  Home,
  Search,
  Music,
  Profile,
  AuthLogin,
  NotFound404,
  AuthSignup,
} from "./pages";

function App() {
  const { isUserAuthenticated } = useContext(UserContext);

  const authenticatedRoutes = (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/music" element={<Music />} />
      <Route path="/u/:username" element={<Profile />} />
    </>
  );

  const unauthenticatedRoutes = (
    <>
      <Route path="*" element={<AuthLogin />} />
      <Route path="/auth/login" element={<AuthLogin />} />
      <Route path="/auth/signup" element={<AuthSignup />} />
    </>
  );

  return (
    <div className="flex min-h-screen bg-body-bg dark:bg-body-bg-dark text-black dark:text-white ">
      {isUserAuthenticated && <NavStack />}
      <main className="w-full max-w-7xl mx-auto md:px-6 pb-16 lg:pb-0">
        <Routes>
          {isUserAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
