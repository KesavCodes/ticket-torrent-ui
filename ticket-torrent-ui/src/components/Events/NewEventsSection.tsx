import LoadingIndicator from "../UI/LoadingIndicator.js";
import ErrorBlock from "../UI/ErrorBlock.js";
import EventItem from "./EventItem.js";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../utils/https.ts";
import { Event } from "../../types/events.types.ts";
import CustomSlider from "../UI/Slider.tsx";

export default function NewEventsSection() {

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { max: 5 }],
    //In the queryFn we can get the queryKey object and use it to pass the arguments. Another way is directly passing the value
    //which is used in the newEventSection
    queryFn: ({
      signal,
      queryKey,
    }: {
      signal: AbortSignal;
      queryKey: [string, { max: number }];
    }) => fetchEvents({ signal, ...queryKey[1] }),
    staleTime: 5000,
    // gcTime: 1000
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.message || "Failed to fetch events!"}
      />
    );
  }

  if (data) {
    content = (
      <div className={`slider-container`}>
        <CustomSlider >
          {data.map((event: Event) => (
            <div key={event.id}>
              <EventItem event={event} />
            </div>
          ))}
        </CustomSlider>
      </div>
    );
  }

  return (
    <section className="mt-4 pt-0 md:px-12 overflow-hidden p-4">
      <header className="mb-4">
        <h2 className="text-3xl text-white">Recently Added Events</h2>
      </header>
      {content}
    </section>
  );
}
