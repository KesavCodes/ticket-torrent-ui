import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.js";
import EventForm from "./EventForm.js";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent, queryClient } from "../../utils/https.ts";
import ErrorBlock from "../UI/ErrorBlock.js";

export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/");
    },
  });
  function handleSubmit(formData:FormData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("/")}>
      <h2 className="text-center text-2xl">Add new Event</h2>
      <EventForm onSubmit={handleSubmit} inputData={{}}>
        {isPending && <p>Submitting...</p>}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            error.info?.message ||
            "Failed to create event. Please check your inputs and try again later."
          }
        />
      )}
    </Modal>
  );
}
