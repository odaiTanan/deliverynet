import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  //we want to see the rule in order to set dashboard button
  const userRule = useSelector((state) => state.user?.user?.rule);
  return (
    <div className="flex flex-col tab:gap-8 gap-12 items-start pl-32 tab:pl-10 mobile:pl-2 text-white justify-center rounded-xl  h-[80vh] w-full bg-[url('../images/header_img.png')] bg-cover bg-left ">
      <div>
        {" "}
        <h1 className="font-bold mobile:text-3xl text-4xl ">Order Your</h1>
        <h1 className="font-bold mobile:text-3xl text-4xl">
          {" "}
          Favourite Food Here
        </h1>
      </div>{" "}
      <p className="text-2xl mobile:text-xl">
        This restaurant is Your Best Choice To Eat Delecios Food
      </p>
      {userRule == 99 || userRule == 98 ? (
        <Link to="/dashboard" className="but">
          Dashboard
        </Link>
      ) : (
        <button
          onClick={() => {
            window.scrollTo({
              left: 0,
              top: "500",
              behavior: "smooth",
            });
          }}
          className="but"
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default Header;
