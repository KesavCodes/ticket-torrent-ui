import { Event } from "../../types/events.types";

export default function EventForm({
  inputData,
  onSubmit,
  children,
}: {
  inputData: null | Event;
  onSubmit: (data: FormData) => void;
  children: React.ReactNode;
}) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, image: "" });
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
        <label htmlFor="title" className="text-xl">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
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
          <label htmlFor="time" className="text-xl">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
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
          <label htmlFor="location" className="text-xl">
            City
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className={`${inputClass} md:w-[200px]`}
            defaultValue={inputData?.city?.name ?? ""}
          />
        </p>
        <p className={inputControlClass}>
          <label htmlFor="tags" className="text-xl">
            Hosted by
          </label>
          <input
            type="text"
            id="hosted"
            name="hosted"
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
            defaultValue={inputData?.tags.join(",") ?? ""}
          />
        </p>
      </div>

      <p className="flex justify-between mt-4">{children}</p>
    </form>
  );
}
