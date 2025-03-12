import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AppContext from "./context/items/AppContext";
import UserContext from "./context/items/UserContext";
import LoadingScreen from "./components/app/LoadingScreen";
import NavStack from "./layout/NavStack";
import {
  Home,
  Search,
  Music,
  ChatStack,
  Profile,
  AuthLogin,
  AuthSignup,
  NotFound404,
} from "./pages";

function App() {
  const { isAppLoading } = useContext(AppContext);
  const { isUserAuthenticated, loading } = useContext(UserContext);

  if (isAppLoading || loading) {
    return <LoadingScreen />;
  }

  const authenticatedRoutes = (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/music" element={<Music />} />
      <Route path="/direct/t/:roomId" element={<ChatStack />} />
      <Route path="/direct/inbox" element={<ChatStack />} />
      <Route path="/u/:username" element={<Profile />} />
    </>
  );

  const unauthenticatedRoutes = (
    <>
      <Route path="*" element={<AuthLogin />} />
      <Route path="/auth/login" element={<AuthLogin />} />
      <Route path="/auth/signup" element={<AuthSignup />} />
      <Route path="/u/:username" element={<Profile />} />
    </>
  );

  return (
    <div className="flex min-h-screen bg-body-bg dark:bg-body-bg-dark text-black dark:text-white">
      {isUserAuthenticated && <NavStack />}
      <main className="w-full max-w-7xl mx-auto md:px-6 pb-12 md:pb-0">
        <Routes>
          {isUserAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
