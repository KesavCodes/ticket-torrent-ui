import { useNavigate } from "react-router-dom";
import { EventShortDescription } from "../../types/events.types";

const EventProfileCard = ({ event }: { event: EventShortDescription }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/events/${event.id}`);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="flex flex-col sm:flex-row gap-4 shadow-lg rounded-md">
      <img
        src={event.cover}
        className="aspect-video max-sm:h-48 max-md:h-56 h-36 rounded-md hover:cursor-pointer"
        alt="event image"
        onClick={handleClick}
      />
      <div className="flex flex-col gap-2 w-full p-2 justify-between py-4">
        <div className="flex flex-col gap-4">
          <header
            className="text-xl font-bold hover:cursor-pointer"
            onClick={handleClick}
          >
            {event.name}
          </header>
          <p className="text-sm">{event.description}</p>
        </div>
        <div className="flex justify-between flex-wrap gap-4">
          <span className="bg-blue-500 px-2 rounded-md">{formattedDate}</span>
          <span className="bg-blue-500 px-2 rounded-md">{event.city.name}</span>
        </div>
      </div>
    </section>
  );
};

export default EventProfileCard;
