import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEventById, queryClient } from "../../utils/https.ts";
import LoadingIndicator from "../UI/LoadingIndicator.js";
import ErrorBlock from "../UI/ErrorBlock.js";
import { useState } from "react";
import Modal from "../UI/Modal.js";

import filledHeartLogo from "../../assets/event-card/like/filledHeart.png";
import emptyHeartLogo from "../../assets/event-card/like/emptyHeart.png";
import locationLogo from "../../assets/event-card/location.svg";
import sparkleLogo from "../../assets/event-card/shine.svg";
import calenderLogo from "../../assets/event-card/calender.svg";
import { Link } from "react-router-dom";

export default function EventDetails() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEventById({ signal, id: id ?? "" }),
  });

  const {
    mutate,
    isPending: isPendingForDelete,
    isError: isErrorForDelete,
    error: errorFOrDelete,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  let content;
  if (isPending)
    content = (
      <div id="event-details-content" className="center">
        <LoadingIndicator />;
      </div>
    );
  if (isError)
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to retrieve event"
          message={error.message || "Try again later."}
        />
      </div>
    );

  if (data) {
    console.log(data.date);
    const formattedDateForBanner = new Date(data.date)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      })
      .split(" ");
    const dateAndTime = new Date(data.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    content = (
      <article className=" md:w-4/5 h-[800px] flex bg-gray-500 bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-md text-white text-xl">
        <section className="flex flex-col w-3/5">
          <div className="relative">
            <img
              src={data.cover}
              alt={data.title}
              className="w-full rounded-r-md md:h-[440px] lg:h-[520px] xl:h-[620px]"
            />
            <div className="absolute top-6 aspect-square left-8 bg-white px-2 py-0.5 rounded-md flex justify-center items-stretch flex-col">
              <span className="text-center text-2xl font-extrabold text-black">
                {formattedDateForBanner[1]}
              </span>
              <span className=" text-red-600 font-bold text-sm">
                {formattedDateForBanner[0].toUpperCase()}
              </span>
            </div>
            <div className="absolute top-6 right-8 bg-white p-2 flex justify-center items-stretch flex-col rounded-full ">
              <img
                src={data.favorite ? filledHeartLogo : emptyHeartLogo}
                alt="favorite"
                className="w-full h-4"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between mt-4 p-4">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-3 items-center">
                <img
                  src={locationLogo}
                  alt="location pin logo"
                  className="h-5"
                />
                <p>{data.address}</p>
              </div>
              <div className="flex gap-3 items-center">
                <img src={sparkleLogo} alt="sparkly logo" className="h-5" />
                By {data.hostedBy}{" "}
              </div>
              <div className="flex gap-3 items-center">
                <img src={calenderLogo} alt="calender logo" className="h-5" />
                <span>{dateAndTime}</span>
              </div>
            </div>
            <div className="max-lg:mt-4 flex flex-col lg:items-end gap-4 lg:justify-between">
              <span className="bg-blue-700 px-2 py-1 rounded-md">
                {data.category}
              </span>
              <div className="flex gap-2">
                {data.tags.length > 0 &&
                  data.tags.map((item: string, index: number) => {
                    return (
                      <span
                        key={index}
                        className="text-sm bg-blue-700 rounded-2xl px-2 py-1"
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
        <section className="w-2/5 p-8 flex flex-col gap-6">
          <h2 className="text-4xl font-bold">{data.name}</h2>
          <p className="my-2">{data.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-3xl">Tickets</span>
            <Link
              to={`events/`}
              className="text-center bg-blue-500 text-white w-1/2 px-2 py-1 rounded-md hover:bg-blue-600"
            >
              Sell Tickets
            </Link>
          </div>
        </section>
      </article>
    );
  }
  return (
    <>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className="form-actions">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="button-text"
              disabled={isErrorForDelete}
            >
              Cancel
            </button>
            <button
              onClick={() => mutate({ id: id ?? "" })}
              className="button"
              disabled={isErrorForDelete}
            >
              {isPendingForDelete ? "Deleting..." : "Delete"}
            </button>
          </div>
          {isErrorForDelete && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                errorFOrDelete.message ||
                "Something went wrong. Try again later."
              }
            />
          )}
        </Modal>
      )}
      {content}
    </>
  );
}
