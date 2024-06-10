import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
const Navbar = () => {
  const [activ, setActiv] = useState("home");
  let ul = useRef();
  function checked(li) {
    setActiv(li.target.name);
  }

  function hideAndShow(e) {
    ul.current.classList.toggle("activeUl");
  }
  const user = useSelector((state) => state.user?.user);
  const cart = useSelector((state) => state.cart);

  return (
    <div className="w-full relative flex justify-center">
      <div className="w-full flex items-center  justify-between text-xl bg-white py-5  tab:w-[97%]">
        <h1 className="text-orange-600 font-bold text-3xl tab:text-2xl">
          Shawerma
        </h1>{" "}
        <ul
          ref={ul}
          id="ul"
          className="inActiveUl  tab:gap-0  transition-all duration-500"
        >
          <NavLink
            to="#1"
            className={`li tab:activeLi ${activ == "home" && "checked"}`}
            onClick={checked}
            name="home"
          >
            Home
          </NavLink>
          <NavLink
            to="#2"
            className={`li tab:activeLi ${activ == "menu" && "checked"}`}
            onClick={checked}
            name="menu"
          >
            Menu
          </NavLink>

          <NavLink
            to="/myrequests"
            className={`li tab:activeLi ${activ == "concat" && "checked"}`}
            onClick={checked}
            name="concat"
          >
            My Requests
          </NavLink>
        </ul>
        <div className="  text-orange-600 mobile:text-lg text-2xl tab:text-2xl mobile:gap-3 flex items-center gap-5 cursor-pointer ">
          <Link to="/cart">
            {" "}
            <i className="fas fa-shopping-bag relative">
              <span className="absolute right-[-50%] top-[50%] text-[12px] font-normal p-1 rounded-circle text-white bg-black mobile:text-[10px] ">
                {cart.length}
              </span>
            </i>
          </Link>

          <span className="hidden tab:flex">
            {" "}
            <i className=" fa fa-bars   " onClick={hideAndShow}></i>
          </span>
          {!user?.token && (
            <NavLink
              to="/auth/signin"
              className="p-1 !text-orange-600  decoration-none transition-all duration-150 px-4 mobile:text-[15px] mobile:px-2 mobile:py-1 font-normal  text-[18px] rounded-3xl hover:bg-orange-600 hover:!text-white bg-white border-2 border-orange-600"
            >
              Sign In
            </NavLink>
          )}
          {user?.token && (
            <div
              onClick={() => {
                const cookie = new Cookies();
                cookie.remove("token");
                cookie.remove("rule");
                window.location.pathname = "/auth/signIn";
              }}
              className="p-1 !text-orange-600  decoration-none transition-all duration-150 px-4 mobile:text-[15px] mobile:px-2 mobile:py-1 font-normal  text-[18px] rounded-3xl hover:bg-orange-600 hover:!text-white bg-white border-2 border-orange-600"
            >
              Sign out
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
