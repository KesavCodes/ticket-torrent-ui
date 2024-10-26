import { useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.js";
import { useMutation } from "@tanstack/react-query";
import { createNewTicket, queryClient } from "../../utils/https.ts";
import ErrorBlock from "../UI/ErrorBlock.js";
import TicketForm from "./TicketForm.js";
import { TicketRequest } from "../../types/tickets.types.ts";

export default function NewTicket() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", id] });
      navigate(`/events/${id}`);
    },
  });
  function handleSubmit(formData: TicketRequest) {
    mutate(formData);
  }
  console.log(error?.message, '---Errors')

  return id ? (
    <Modal onClose={() => navigate("/")}>
      <h2 className="text-3xl text-center text-blue-700">Add Ticket</h2>
      <TicketForm onSubmit={handleSubmit} eventId={id || ""}>
        {isPending && <p>Submitting...</p>}
        {!isPending && (
          <>
            <button type="button" onClick={()=>navigate(-1)} className="text-red-700 text-xl">
              Cancel
            </button>
            <button type="submit" className="text-green-800 text-xl">
              Create
            </button>
          </>
        )}
      </TicketForm>
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={
            error.message.toString() ||
            "Failed to create event. Please check your inputs and try again later."
          }
        />
      )}
    </Modal>
  ) : (
    <></>
  );
}
