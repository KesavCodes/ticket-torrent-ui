import { Link } from "react-router-dom";

import profileLogo from "../assets/profile.svg";

import Header from "./Header.js";
import EventsIntroSection from "./Events/EventsIntroSection.js";
import FindEventSection from "./Events/FindEventSection.js";
import NewEventsSection from "./Events/NewEventsSection.js";
import { useAuthStore } from "../store/auth.store.js";

export default function Events() {
  const user = useAuthStore((state) => state.user);
  console.log(user, '--from home')
  return (
    <>
      <Header>
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
        <EventsIntroSection />
        <NewEventsSection />
        <FindEventSection />
      </main>
    </>
  );
}
