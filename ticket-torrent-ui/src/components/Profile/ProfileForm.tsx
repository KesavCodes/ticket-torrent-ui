
export default function ProfileForm({
  eventId,
  onSubmit,
  children,
}: {
  eventId: string;
  onSubmit: (data: UserProfile) => void;
  children: React.ReactNode;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { price, quantity, category } = Object.fromEntries(formData);

    onSubmit({
      eventId,
      price: Number(price),
      quantity: Number(quantity),
      category:String(category),
      status: 'Available',
    });
  }
  const inputControlClass = "flex flex-col gap-2";
  const inputClass = "outline-none p-1 rounded-md";
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <p className={inputControlClass}>
        <label htmlFor="category" className="text-xl">
          Ticket Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className={inputClass}
        />
      </p>
      <p className={inputControlClass}>
        <label htmlFor="quantity" className="text-xl">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className={inputClass}
        />
      </p>
      <p className={inputControlClass}>
        <label htmlFor="price" className="text-xl">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className={inputClass}
        />
      </p>
      <p className="flex justify-between mt-4">{children}</p>
    </form>
  );
}
