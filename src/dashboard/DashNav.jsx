import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full bg-slate-800 px-6 relative flex justify-center items-center">
      <div className="w-full flex items-center  justify-between text-xl  py-5  tab:w-[95%]">
        <h1 className="text-orange-600 font-bold text-3xl tab:text-2xl">
          Shawerma
        </h1>{" "}
        <div className="  text-orange-600 mobile:text-lg text-2xl tab:text-2xl mobile:gap-3 flex items-center gap-5 cursor-pointer ">
          <NavLink
            to="/"
            className="p-1 !bg-orange-600 text-white  decoration-none transition-all duration-150 px-4 mobile:text-[15px] mobile:px-2 mobile:py-1 font-normal  text-[18px] rounded-3xl hover:bg-orange-600 hover:!text-white  border-2 border-orange-600"
          >
            Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
