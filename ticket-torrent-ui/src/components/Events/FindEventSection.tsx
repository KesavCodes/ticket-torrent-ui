import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { fetchEvents } from "../../utils/https.ts";
import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import EventItem from "./EventItem";
import { Event } from "../../types/events.types.ts";

import CustomSlider from "../UI/Slider.tsx";
import Cities from "./Cities.tsx";

export default function FindEventSection({
  path,
  initialSearchTerm,
  formClassName,
}: {
  path: "allEvents" | "Home";
  initialSearchTerm?: string;
  formClassName?: string;
}) {
  const searchElement = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    initialSearchTerm
  );
  const [cityId, setCityId] = useState<string | undefined>();

  const onCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const cityValue = event.currentTarget.value;
    setCityId(cityValue);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }, cityId],
    queryFn: ({ signal }) =>
      fetchEvents({
        signal,
        search: searchTerm,
        ...(cityId && cityId !== "__all__"
          ? { optionalQuery: { cityId } }
          : {}),
      }),
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
    content =
      path === "Home" ? (
        <div className={`slider-container`}>
          <CustomSlider>
            {data.map((event: Event) => (
              <div key={event.id}>
                <EventItem event={event} />
              </div>
            ))}
          </CustomSlider>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {data.map((event: Event) => (
            <div key={event.id}>
              <EventItem event={event} />
            </div>
          ))}
        </div>
      );
  }
  return (
    <section className="mt-4 pt-0 md:px-12 overflow-hidden p-4">
      <header className="mb-4">
        <h2 className={"flex text-3xl mb-4 text-white" + " " + formClassName}>
          Find Your Event
        </h2>
        <form
          onSubmit={handleSubmit}
          className={"flex gap-6" + " " + formClassName}
        >
          <div className="flex gap-4">
            <input
              type="search"
              placeholder="Search events"
              ref={searchElement}
              className="w-64 p-2 rounded-md text-black"
            />
            <Cities
              inputClass="w-64 px-2 py-3  rounded-md text-black"
              forSearch={true}
              changeHandler={onCityChange}
            />
          </div>
          <button
            className={
              formClassName
                ? "text-gray-800 mt-4 flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-300 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gray-800 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-[1] px-4 py-2 overflow-hidden border-2 rounded-full group"
                : "text-white"
            }
          >
            Search
            {formClassName && (
              <svg
                className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  className="fill-gray-800 group-hover:fill-gray-800"
                ></path>
              </svg>
            )}
          </button>
        </form>
      </header>
      {content}
    </section>
  );
}
