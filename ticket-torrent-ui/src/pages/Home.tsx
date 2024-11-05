import EventsIntroSection from "../components/Events/EventsIntroSection.js";
import FindEventSection from "../components/Events/FindEventSection.js";
import NewEventsSection from "../components/Events/NewEventsSection.js";

export default function Events() {
  return (
    <>
      <EventsIntroSection />
      <NewEventsSection />
      <FindEventSection path="Home" />
    </>
  );
}
