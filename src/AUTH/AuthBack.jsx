import React from "react";
import { Outlet } from "react-router-dom";
import SignIn from "./Sign-in";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import authBg from "../images/orange.jpg";
const AuthBack = () => {
  const Location = useLocation();
  //    notification icon <i class="fas fa-bell text-white"></i>
  return (
    <div className="block w-[90%] mobile:w-[97%] tab:w-[500px] h-[86vh]">
      <Nav />

      <div className="  bg-white w-full h-full  center font-normal  ">
        <div className="w-[75%]   mobile:w-[95%]  shadow-form  border-2 rounded-lg  bg-[linear-gradient(110deg,_white_53%,_transparent_47%),url('../images/orange.jpg')] tab:bg-[linear-gradient(120deg,_#ffffff8c_50%,_#ffffff8c_50%),url('../images/orange.jpg')]   border-none  h-[450px] flex justify-between items-center">
          {/*Dont leave AuthBack empty in first time */}
          {location.pathname == "/" ? <SignIn /> : <Outlet />}{" "}
          <div className="  bg-transparent tab:hidden    w-3/6 h-full bg-cover bg-top "></div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AuthBack;
