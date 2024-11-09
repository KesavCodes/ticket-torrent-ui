import { TicketResponse } from "../../types/tickets.types";
import TicketContainer from "./TicketContainer";

const AvailableTickets = ({ tickets }: { tickets: TicketResponse[] }) => {
  if (!tickets || !tickets.length)
    return (
      <p className="text-xl text-center mt-4 mx-2 p-8 outline rounded-lg outline-1 outline-blue-500">
        No Tickets available for this event!
      </p>
    );

  tickets.sort((a, b) => b.price - a.price);
  return (
    <div className="mt-4">
      {tickets.map((value) => (
        <TicketContainer key={value.id} ticket={value} />
      ))}
    </div>
  );
};

export default AvailableTickets;
