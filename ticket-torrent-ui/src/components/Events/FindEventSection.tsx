import { useQuery } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import { fetchEvents } from "../../utils/https.ts";
import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import EventItem from "./EventItem";
import { Event } from "../../types/events.types.ts";

import CustomSlider from "../UI/Slider.tsx";

export default function FindEventSection() {
  const searchElement = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, search: searchTerm }),
    enabled: searchTerm !== undefined,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchTerm(searchElement.current?.value);
  }

  let content = (
    <p className="text-sm mb-4 text-white">
      Please enter a search term to find events.
    </p>
  );
  if (isLoading) content = <LoadingIndicator />;
  if (isError)
    content = (
      <ErrorBlock
        title="An error occurred"
        message={
          error.message || "Something went wrong. Failed to retrieve events."
        }
      />
    );
  if (data) {
    content = (
      <div className={`slider-container`}>
        <CustomSlider>
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
        <h2 className="text-3xl mb-4 text-white">Find Your Event</h2>
        <form onSubmit={handleSubmit} className="flex gap-6">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
            className="w-64 p-2 rounded-md text-black"
          />
          <button className="text-white">Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
