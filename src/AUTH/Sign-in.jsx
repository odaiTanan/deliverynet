import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../rtk/slices/user-slice";
import { ToastContainer, toast } from "react-toastify";
import "../index.css";
import Loading from "../Loading";
import Cookies from "universal-cookie";
const SignIn = () => {
  let nav = useNavigate();

  const errorPassword = () => toast.error("wrong password");
  const errorEmail = () => toast.error(" email not found");
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.baseUrl);

  const loading = useSelector((state) => state.user.loading);

  //variable we use to prevent error messages appeare first time
  let checkFirstTime = true;
  //put input content in this object
  let inputs = useRef({
    email: "",
    password: "",
  });
  //reference to inputs error messages

  const refEmail = useRef();
  const refPass = useRef();

  //Check Error in every element
  let errorE = {
    email: true,
    password: true,
  };

  //getting inputs content in our object dynamically and send it to check function
  function handleInputs(e) {
    inputs.current = { ...inputs.current, [e.target.name]: e.target.value };

    check(e.target.name);
  }
  //a function to check every input requirements
  function check(e) {
    switch (e) {
      case "email":
        const email = inputs.current.email;
        if (
          !email.match(/^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/) &&
          !checkFirstTime
        ) {
          refEmail.current.style.display = "block";
          errorE = { ...errorE, email: true };
        } else {
          refEmail.current.style.display = "none";
          errorE = { ...errorE, email: false };
        }
        break;
      case "password":
        const password = inputs.current.password;
        if (
          password.length <= 7 ||
          !(
            password.match(/[A-Z]+/) &&
            password.match(/[a-z]+/) &&
            password.match(/\d+/)
          )
        ) {
          !checkFirstTime ? (refPass.current.style.display = "block") : "";
          errorE = { ...errorE, password: true };
        } else {
          refPass.current.style.display = "none";
          errorE = { ...errorE, password: false };
        }
        break;
    }
  }
  const user = useSelector((state) => state?.user?.user?.token);

  useEffect(() => {
    if (user) {
      nav(-1);
    }
  }, [user]);
  //submit function to send data
  function Submitt(e) {
    e.preventDefault();
    //variable we use to prevent error messages appeare first time
    checkFirstTime = false;
    //check before submit

    check("email");
    check("password");
    let formData = new FormData();

    formData.append("email", inputs.current.email);
    formData.append("password", inputs.current.password);
    //if our errors object elements are all false then Pass
    if (errorE.email !== true && errorE.password !== true) {
      dispatch(
        addUser({
          formData,
          baseUrl,
          InOrUp: "in",
        })
      ).then((res) => {
        if (res.payload == "wrong password") {
          errorPassword();
        } else if (res.payload == "no user found") {
          errorEmail();
        } else {
          nav("/");
        }
      });
    }
  }
  return (
    <div className=" w-3/6  h-[90%] m-auto   tab:w-full  ">
      <form
        className="flex bg-none tab:items-center flex-col justify-between p-5 py-7 w-full h-full "
        method="post"
        onSubmit={Submitt}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <input
              className="input "
              type="email"
              name="email"
              id="email"
              onChange={handleInputs}
              placeholder="Enter Your Email"
              required
            />{" "}
            <p className="error" ref={refEmail}>
              Invalid Email
            </p>
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              onChange={handleInputs}
              placeholder="Enter Your Password"
              required
            />{" "}
            <p className="error" ref={refPass}>
              Pass Must be more than 7 chars and contain small and capital
              letters
            </p>
            <button className="btn mb-4">Sign In</button>
            <span className="text-black text-lg">
              You Dont Have An Account ?
              <Link to="/auth/signUp" className="text-orange-600  text-lg">
                Sign Up
              </Link>
            </span>
          </>
        )}
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignIn;
