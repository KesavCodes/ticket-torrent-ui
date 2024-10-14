import { Outlet, Link } from "react-router-dom";
import Header from "../Header.js";

export default function Events() {
  return (
    <>
      <Header>
        <Link to="/" className="nav-item">
          View all Events
        </Link>
      </Header>
      <main className="flex justify-center items-center mt-7">
        <Outlet />
      </main>
    </>
  );
}
