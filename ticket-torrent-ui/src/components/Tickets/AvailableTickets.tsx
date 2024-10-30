import { TicketResponse } from "../../types/tickets.types";

const AvailableTickets = ({ tickets }: { tickets: TicketResponse[] }) => {
  if (!tickets || !tickets.length)
    return <p className="text-xl text-center mt-4 p-8 outline rounded-lg outline-1 outline-blue-500">No Tickets available for this event!</p>;

  const allTickets = tickets.reduce<Record<string, TicketResponse[]>>((acc, curr) => {
    if(acc[curr.category]) acc[curr.category].push(curr)
    else acc[curr.category] = [curr];
    return acc;
  }, {});

  return (
    <div className="mt-4">
      {Object.entries(allTickets).map(([key, value]) => {
        return (
          <div
            key={value[0].id}
            className="flex flex-col gap-4 rounded-md shadow-2xl mb-8 p-4"
          >
            <h3 className="text-2xl font-bold">{key}</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p>
                  No of tickets{" "}
                  <span className="bg-blue-500 px-2 rounded-md">
                    {value.reduce((acc, curr) => acc + curr.quantity, 0)}
                  </span>
                </p>
                <p>
                  Price{" "}
                  <span className="bg-blue-500 px-2 rounded-md">
                    {value[0].price}
                  </span>
                </p>
              </div>
              <p><span className="text-sm">Posted by</span> {value[0].userId}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvailableTickets;
