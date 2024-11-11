import { useQuery } from "@tanstack/react-query";
import { fetchMyDetails } from "../../utils/https.ts";
import LoadingIndicator from "../UI/LoadingIndicator.js";

import editIcon from "../../assets/edit.svg";
import { useNavigate } from "react-router-dom";
import CardContainer from "../UI/CardContainer.tsx";
import AvailableTickets from "../Tickets/AvailableTickets.tsx";
import { useAuthStore } from "../../store/auth.store.ts";
import EventProfileCard from "../Events/EventProfileCard.tsx";
import { EventShortDescription } from "../../types/events.types.ts";

export default function Profile() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  if (!user) navigate("/auth");

  const { data, isPending, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: ({ signal }) => fetchMyDetails({ signal }),
    retry: 1,
  });

  if (isError) navigate("/auth");
  let content;
  if (isPending)
    content = (
      <div className="flex justify-center items-center">
        <LoadingIndicator />;
      </div>
    );
  if (data) {
    const boxClass =
      "relative outline outline-1 outline-blue-500 px-3 py-4 rounded-md max-lg:w-full  w-[250px]";
    const labelClass = "absolute -top-2 text-sm bg-blue-500 rounded-lg px-2";
    const valueClass = "ml-4 text-xl";
    content = (
      <main className=" md:w-4/5 sm:mt-10 flex flex-col m-auto  bg-gray-500 bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded-md text-white xl:text-xl">
        <section className="flex justify-between w-full flex-col-reverse lg:flex-row">
          <div className="flex flex-col gap-8 p-4">
            <h2 className="text-2xl font-bold">Profile Info</h2>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
              <p className={boxClass}>
                <span className={labelClass}>username</span>{" "}
                <span className={valueClass}>{data.username}</span>
              </p>
              <p className={boxClass}>
                <span className={labelClass}>email</span>{" "}
                <span className={valueClass}>{data.email}</span>
              </p>
            </div>

            <div className="flex gap-4">
              <p className={`${boxClass} flex justify-between`}>
                <span className={labelClass}>Display name</span>{" "}
                {data.name ?? <span className={valueClass}>Not Specified</span>}
                <img src={editIcon} alt="edit icon" className="w-5" />
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                {" "}
                <span className="bg-blue-500 text-white rounded-md px-2 mr-2">
                  {data._count.followers}
                </span>
                Followers
              </p>
              <p>
                {" "}
                <span className="bg-blue-500 text-white rounded-md px-2 mr-2">
                  {data._count.follows}
                </span>
                Following
              </p>
            </div>
          </div>
          <div className="max-lg:mt-10 lg:mx-10 flex flex-col gap-4 justify-center items-center rounded-md">
            <img
              src={data.avatar}
              alt="profile photo"
              className="h-40 rounded-lg outline outline-3 outline-blue-500"
            />
            <p className="flex gap-4">
              Edit <img src={editIcon} alt="edit icon" className="w-5" />
            </p>
          </div>
        </section>
        <section className="flex flex-col 2xl:flex-row gap-4 p-4">
          <CardContainer>
            <h2 className="text-2xl font-bold">Tickets Posted</h2>
            {data.tickets.length ? (
              <AvailableTickets tickets={data.tickets} />
            ) : (
              <p className="text-center text-sm mt-3">Posted no ticket yet</p>
            )}
          </CardContainer>
          <CardContainer>
            <h2 className="text-2xl font-bold">Requests</h2>
            <p className="text-center text-sm mt-3">No ticket request found</p>
          </CardContainer>
        </section>
        <section className="flex flex-col 2xl:flex-row gap-4 p-4">
          <CardContainer>
            <h2 className="text-2xl font-bold">Liked Events</h2>
            {data.likes.length ? (
              <div className="flex flex-col gap-4 mt-6">
                {data.likes.map(
                  (item: { id: string; event: EventShortDescription }) => {
                    return <EventProfileCard event={item.event} key={item.id}/>;
                  }
                )}
              </div>
            ) : (
              <p className="text-center text-sm mt-3">Posted no ticket yet</p>
            )}
          </CardContainer>
          <CardContainer>
            <h2 className="text-2xl font-bold">Saved Events</h2>
            <p className="text-center text-sm mt-3">No saved ticket found</p>
          </CardContainer>
        </section>
      </main>
    );
  }
  return content;
}
