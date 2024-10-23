export default function ErrorBlock({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className=" flex justify-center items-center gap-4 sm:flex-col bg-gray-300 px-2 py-4 rounded-md mt-4">
      <div className="text-red-800 bg-white px-6 py-3 rounded-full font-extrabold text-2xl inline-block">!</div>
      <div className="flex flex-col gap-1 sm:text-center">
        <h2 className="text-xl font-bold text-red-600">{title}</h2>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
