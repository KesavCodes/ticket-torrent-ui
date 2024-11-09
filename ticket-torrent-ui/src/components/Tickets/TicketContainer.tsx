import getInTouchLogo from "../../assets/getInTouch.svg";
import profileLogo from "../../assets/profile.svg";
import emailLogo from "../../assets/email.svg";
import phoneLogo from "../../assets/phone.svg";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { TicketResponse } from "../../types/tickets.types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "../../utils/https";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";

const TicketContainer = ({ ticket }: { ticket: TicketResponse }) => {
  const user = useAuthStore((state) => state.user);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user", { userId: ticket.userId }],
    queryFn: ({ signal }) => fetchUserDetails({ id: ticket.userId, signal }),
    enabled: showContact,
  });

  const getContactHandler = () => {
    if (!user) navigate("/auth");
    setShowContact(true);
  };

  let contactContent;
  if (isPending) contactContent = <LoadingIndicator />;
  if (isError)
    contactContent = (
      <ErrorBlock
        title="Failed to retrieve user info"
        message={error.message || "Try again later."}
      />
    );
  if (data)
    contactContent = (
      <div className="flex flex-col gap-2 outline outline-2 p-4 outline-blue-500 rounded-md">
        <p className="flex gap-4 items-center text-xl">
          <img src={profileLogo} alt="profile logo" className="h-5" />{" "}
          <span>{data.name || data.username}</span>
        </p>
        <p className="flex gap-4 items-center text-xl">
          <img src={emailLogo} alt="email logo" className="h-5" />{" "}
          <span>{data.email}</span>
        </p>
        <p className="flex gap-4 items-center text-xl">
          <img src={phoneLogo} alt="phone logo" className="h-5" />{" "}
          <span>{data.phone || "N/A"}</span>
        </p>
        <button
          className="w-full bg-blue-500 py-1 rounded-md"
          onClick={() => setShowContact(false)}
        >
          Close
        </button>
      </div>
    );

  return (
    <div
      key={ticket.id}
      className="flex flex-col gap-4 rounded-md shadow-2xl mb-8 p-4"
    >
      <h3 className="text-2xl font-bold">{ticket.category}</h3>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p>
            No of tickets{" "}
            <span className="bg-blue-500 px-2 rounded-md">
              {ticket.quantity}
            </span>
          </p>
          <p>
            Price{" "}
            <span className="bg-blue-500 px-2 rounded-md">{ticket.price}</span>
          </p>
        </div>
        <p>
          <span className="text-sm">Posted by</span> {ticket.userId}
        </p>
        {!showContact && (
          <button
            className="flex justify-center items-center gap-4 bg-blue-500 py-1 rounded-md"
            onClick={getContactHandler}
          >
            Get In Touch{" "}
            <img src={getInTouchLogo} className="h-6" alt="Get in touch logo" />
          </button>
        )}
        {showContact && contactContent}
      </div>
    </div>
  );
};

export default TicketContainer;
