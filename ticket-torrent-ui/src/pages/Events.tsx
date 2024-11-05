import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../utils/https";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import FindEventSection from "../components/Events/FindEventSection";

const Event = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    //In the queryFn we can get the queryKey object and use it to pass the arguments. Another way is directly passing the value
    //which is used in the newEventSection
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchEvents({ signal, max: 25 }),
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
    content = <FindEventSection path="allEvents" initialSearchTerm="" formClassName="justify-center items-center flex-col"/>;
  }
  return (
    <div className="text-white ">
      <header className="font-bold text-4xl text-center mb-8">Events</header>
      <section className="flex w-full justify-center items-center">{content}</section>
    </div>
  );
};

export default Event;
