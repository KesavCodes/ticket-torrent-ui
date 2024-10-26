import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.js";
import EventForm from "./EventForm.js";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent, queryClient } from "../../utils/https.ts";
import ErrorBlock from "../UI/ErrorBlock.js";
import {EventRequest } from "../../types/events.types.ts";

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      const newEventId = data.id
      console.log(newEventId, 'new event id')
      navigate(`/events/${newEventId}`);
    },
  });
  function handleSubmit(eventData:EventRequest) {
    mutate(eventData);
  }


  return (
    <Modal onClose={() => navigate("/")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Submitting...</p>}
        {!isPending && (
          <>
            <Link to="/" className="text-red-700 text-xl">
              Cancel
            </Link>
            <button type="submit" className="text-green-800 text-xl">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            error.message ||
            "Failed to create event. Please check your inputs and try again later."
          }
        />
      )}
    </Modal>
  );
}
