import { Link, Outlet } from "react-router-dom";

import Header from "./Header.js";
import EventsIntroSection from "./Events/EventsIntroSection.js";
import FindEventSection from "./Events/FindEventSection.js";
import NewEventsSection from "./Events/NewEventsSection.js";

export default function Events() {
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events/new" className="button">
          New Event
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
