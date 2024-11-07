import { Event, EventRequest } from "../../types/events.types";
import Cities from "./Cities";

export default function EventForm({
  inputData,
  onSubmit,
  children,
}: {
  inputData?: Event;
  onSubmit: (data: EventRequest) => void;
  children: React.ReactNode;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as EventRequest;
    data.cover =
      "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg";

    const dateWithTime = new Date(
      `${data.date}:${data.dateTime}`
    ).toISOString();
    data.date = dateWithTime;
    data.dateTime = dateWithTime;
    data.tags = (data.tags as unknown as string).split(",");

    onSubmit(data);
  }

  let defaultDate;
  let defaultTime;
  if (inputData?.date) {
    const eventDate = new Date(inputData.date).toISOString();
    defaultDate = eventDate.substring(0, 10);
    defaultTime = eventDate.substring(11, 16);
  }

  const inputControlClass = "flex flex-col gap-2";
  const inputClass = "outline-none p-1 rounded-md";
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2 className="text-3xl text-center text-blue-700">Add / Edit Event</h2>
      <p className={inputControlClass}>
        <label htmlFor="name" className="text-xl">
          Title
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={inputData?.name ?? ""}
          className={inputClass}
        />
      </p>

      <p className={inputControlClass}>
        <label htmlFor="description" className="text-xl">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
          className={inputClass}
        />
      </p>

      <div className="flex justify-start gap-8">
        <p className={inputControlClass}>
          <label htmlFor="date" className="text-xl">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className={`${inputClass} md:w-[200px]`}
            defaultValue={defaultDate ?? ""}
          />
        </p>
        <p className={inputControlClass}>
          <label htmlFor="dateTime" className="text-xl">
            Time
          </label>
          <input
            type="time"
            id="dateTime"
            name="dateTime"
            className={`${inputClass} md:w-[200px]`}
            defaultValue={defaultTime ?? ""}
          />
        </p>
      </div>

      <p className={inputControlClass}>
        <label htmlFor="address" className="text-xl">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className={inputClass}
          defaultValue={inputData?.address ?? ""}
        />
      </p>

      <div className="md:flex justify-start md:gap-8">
        <p className={inputControlClass}>
          <Cities
            inputClass={inputClass}
            cityId={inputData?.cityId}
            forSearch={false}
          />
        </p>
        <p className={inputControlClass}>
          <label htmlFor="hostedBy" className="text-xl">
            Hosted by
          </label>
          <input
            type="text"
            id="hostedBy"
            name="hostedBy"
            className={`${inputClass} md:w-[200px]`}
            defaultValue={inputData?.hostedBy ?? ""}
          />
        </p>
      </div>
      <div className="md:flex justify-start md:gap-8">
        <p className={inputControlClass}>
          <label htmlFor="category" className="text-xl">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className={`${inputClass} md:w-[200px]`}
            defaultValue={inputData?.category ?? ""}
          />
        </p>
        <p className={inputControlClass}>
          <label htmlFor="tags" className="text-xl">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className={`${inputClass} md:w-[200px]`}
            defaultValue={inputData?.tags?.join(",") ?? ""}
          />
        </p>
      </div>

      <p className="flex justify-between mt-4">{children}</p>
    </form>
  );
}
