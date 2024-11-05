import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useAuthStore } from "../store/auth.store";

import profileLogo from "../assets/profile.svg";

const Root = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Header>
        <Link to="/events" className="text-xl hidden sm:block">
          All Events
        </Link>
        <Link to="/events/new" className="text-xl hidden sm:block">
          New Event
        </Link>
        <Link
          to={user ? "/profile" : "/auth"}
          className="flex gap-2 justify-center items-center text-xl"
        >
          <img src={profileLogo} alt="profile logo" className="h-5" />
          <span>{user ? "Profile" : "Login"}</span>
        </Link>
      </Header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;