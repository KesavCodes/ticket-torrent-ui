// import { useIsFetching } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  // const fetching = useIsFetching();
  return (
    <>
      {/* <div id="main-header-loading">{fetching > 0 && <progress />}</div> */}
      <header className="m-0 px-8 py-4 flex justify-between items-center sticky top-0 bg-black text-white z-10">
        <div className="flex items-center gap-6">
          <Link to={"/"}>
            <h1 className="text-2xl text-white ">React Events</h1>
          </Link>
        </div>
        <nav className="flex gap-4">{children}</nav>
      </header>
    </>
  );
};

export default Header;
