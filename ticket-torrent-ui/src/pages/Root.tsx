import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";

import profileLogo from "../assets/profile.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchMyDetails } from "../utils/https";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { useAuthStore } from "../store/auth.store";

const Root = () => {
  const { isPending, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: ({ signal }) => fetchMyDetails({ signal }),
    retry: 1,
  });
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  if (isError) {
    logout();
  }

  return (
    <>
      <Header>
        <Link to="/events" className="text-xl hidden sm:block">
          All Events
        </Link>
        <Link to="/events/new" className="text-xl hidden sm:block">
          New Event
        </Link>
        {isPending ? (
          <LoadingIndicator />
        ) : (
          <Link
            to={user ? "/profile" : "/auth"}
            className="flex gap-2 justify-center items-center text-xl"
          >
            <img src={profileLogo} alt="profile logo" className="h-5" />
            <span>{user ? "Profile" : "Login"}</span>
          </Link>
        )}
      </Header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
