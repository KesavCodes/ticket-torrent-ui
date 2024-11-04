import {
  Link,
  // redirect,
  useNavigate,
  useParams,
  useNavigation,
} from "react-router-dom";

import Modal from "../UI/Modal.tsx";
import EventForm from "./EventForm.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEventById, queryClient, updateEvent } from "../../utils/https.ts";
import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import { EventRequest } from "../../types/events.types.ts";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  if(!id) navigate("../")

  // const submit = useSubmit();

  const { state } = useNavigation();

  // Even after using loader, we are keeping this useQuery because for the first time it will simply take the data from the cache and
  // by using this we will also have the automatic fetching functionality when moved to different tab.
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEventById({ signal, id:id! }),
    staleTime: 10000,
  });

  const {
    mutate,
    // isPending: isPendingForUpdate,
    // isError: isErrorForUpdate,
    // error: errorForUpdate,
  } = useMutation({
    mutationFn: updateEvent,
    onMutate: async ({ event: newEvent }) => {
      //when doing optimistic update, make sure to cancel any queries send for the current queryKey. This will cancel any request
      //sent using useQuery for this queryKey
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      //store the current value before updating, so that if the update is failed we can revert to the previous state.
      const previousEvent = queryClient.getQueryData(["events", id]);
      queryClient.setQueryData(["events", id], newEvent);
      // Whatever returned will be sent to the onError function as 'context' argument.
      return { previousEvent };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["events", id], context?.previousEvent);
    },
    //This will be called regardless of the result(success or failure). Revalidate the query just to make sure we have the correct
    // data from the database.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });
  function handleSubmit(formData:EventRequest) {
    mutate({ id:id!, event: formData });
    navigate(-1);
    // submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;
  if (isPending)
    content = (
      <div className="center">
        <LoadingIndicator />;
      </div>
    );
  if (isError)
    content = (
      <div className="center">
        <ErrorBlock
          title="Failed to retrieve event"
          message={error.message || "Try again later."}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </div>
    );
  if (data)
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to={`/events/${id}`} className="text-red-700 text-xl">
          Cancel
        </Link>
        <button
          type="submit"
          className="text-green-800 text-xl"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Updating..." : "Update"}
        </button>
      </EventForm>
    );

  return <Modal onClose={handleClose}>{content}</Modal>;
}

// We can use tanstack query with router if we want
// export const loader = ({ params }) => {
//   const { id } = params;
//   return queryClient.fetchQuery({
//     queryKey: ["events", id],
//     queryFn: ({ signal }) => fetchEventById({ signal, id }),
//   });
// };

// export const action = async ({ request, params }) => {
//   const { id } = params;
//   const formData = await request.formData();
//   const updatedEventData = Object.fromEntries(formData);
//   await updateEvent({ id, event: updatedEventData });
//   await queryClient.invalidateQueries({ queryKey: ["events"] });
//   return redirect("../");
// };
