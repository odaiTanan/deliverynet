import React, { useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./dashboard.css";
const Sidebar = () => {
  const sideRef = useRef();
  const arrowRef = useRef();
  let side = useRef(false);
  function sideSow(e) {
    side.current = !side.current;
    if (side.current) {
      arrowRef.current.style.transform = "rotate(180deg) ";
      sideRef.current.style.left = "-340px";
    } else {
      arrowRef.current.style.transform = "rotate(360deg) ";
      sideRef.current.style.left = "0%";
    }
  }
  return (
    <div
      ref={sideRef}
      className=" rounded-r-xl transition-all  h-[calc(100vh_-84px)] absolute left-0 top-[84px] w-[340px] bg-orange-600  "
    >
      <ul className="Links relative flex flex-col h-full w-full pl-1 pt-3  ">
        <NavLink to="users" className="dashLink">
          users
        </NavLink>
        <NavLink to="adduser" className="dashLink">
          Add User
        </NavLink>
        <NavLink to="menu" className="dashLink">
          Menu
        </NavLink>

        <NavLink to="addmenu" className="dashLink">
          Add To Menu
        </NavLink>
        <NavLink to="requests" className="dashLink">
          Requists
        </NavLink>
        <div
          ref={arrowRef}
          className="arrow cursor-pointer absolute top-[40vh] left-[345px] p-5 flex justify-center items-center text-orange-600 text-xl rounded-circle bg-gray-800 "
          onClick={sideSow}
        >
          <i
            className="fa-solid fa-arrow-right rotate-180 transition-all "
            id="arrow"
          ></i>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
