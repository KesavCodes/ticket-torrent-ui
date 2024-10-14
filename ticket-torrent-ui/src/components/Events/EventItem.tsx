import { Event } from "../../types/events.types";

import styles from "./EventItem.module.css";

import filledHeartLogo from "../../assets/event-card/like/filledHeart.png";
import emptyHeartLogo from "../../assets/event-card/like/emptyHeart.png";
import calenderLogo from "../../assets/event-card/calender.svg";
import locationLogo from "../../assets/event-card/location.svg";
import moneyLogo from "../../assets/event-card/money.svg";
import sparkleLogo from "../../assets/event-card/shine.svg";
import { Link } from "react-router-dom";

export default function EventItem({ event }: { event: Event }) {
  const formattedDateForBanner = new Date(event.date)
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    })
    .split(" ");

  const dateAndTime = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const detailsItemClass = "flex gap-2 items-center font-medium text-sm";

  console.log(event, "--event");
  return (
    <article
      className={`rounded-md w-[21rem] sm:w-[20rem] md:w-[21rem] lg:w-[24rem] xl:w-[27rem] bg-white-box ${styles["bg-white-box"]} text-white ${styles["b-game-card"]}`}
    >
      <div className="relative p-4">
        <img
          src={event.cover}
          alt={event.name}
          className="p-2 w-full lg:h-64 rounded-2xl"
        />
        <div className="absolute top-8 aspect-square left-8 bg-white px-2 py-0.5 rounded-md flex justify-center items-stretch flex-col">
          <span className="text-center text-2xl font-extrabold text-black">
            {formattedDateForBanner[1]}
          </span>
          <span className=" text-red-600 font-bold text-sm">
            {formattedDateForBanner[0].toUpperCase()}
          </span>
        </div>
        <div className="absolute top-8 right-8 bg-white p-2 flex justify-center items-stretch flex-col rounded-full ">
          <img
            src={event.favorite ? filledHeartLogo : emptyHeartLogo}
            alt="favorite"
            className="w-full h-4"
          />
        </div>
      </div>
      <section className="p-4">
        <header>
          <span className="bg-blue-500  px-2 py-1  rounded-md">
            {event.category}
          </span>
          <h2 className="text-xl font-bold mt-3">{event.name}</h2>
        </header>
        <main className="flex flex-col gap-3 my-2">
          <div className={detailsItemClass}>
            <img src={locationLogo} alt="location logo" className="h-5" />
            <span>{event.address}</span>
          </div>
          <div className={detailsItemClass}>
            <img src={calenderLogo} alt="calender logo" className="h-5" />
            <span>{dateAndTime}</span>
          </div>
          <div className={detailsItemClass}>
            <img src={moneyLogo} alt="money logo" className="h-5" />
            <span>
              From <b>$99.99</b>
            </span>
          </div>
          <div className={detailsItemClass}>
            <img src={sparkleLogo} alt="sparkle logo" className="h-5" />
            <span>
              By <b>{event.hostedBy}</b>
            </span>
          </div>
        </main>
        <div className="flex gap-2 mt-4 mb-2">
          <Link to={`events/${event.id}`} className="text-center bg-blue-500 text-white w-1/2 px-2 py-1 rounded-md hover:bg-blue-600">
              Buy Tickets
          </Link>
          <Link to={`events/${event.id}`} className="text-center bg-gray-200 w-1/2 px-2 py-1 rounded-md text-black hover:bg-gray-300">
              View details
          </Link>
        </div>
      </section>
    </article>
  );
}
