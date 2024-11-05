import { Outlet } from "react-router-dom";

export default function Events() {
  return (
    <section className="flex justify-center items-center mt-7 p-8">
      <Outlet />
    </section>
  );
}
