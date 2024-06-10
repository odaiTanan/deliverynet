import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import { addUser } from "../rtk/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const baseUrl = useSelector((state) => state.baseUrl);
  const errorEmailTaken = () =>
    toast.error("This Email Has Already Been Taken");
  //variable we use to prevent error messages appeare first time
  let checkFirstTime = true;

  //put input content in this object
  let inputs = useRef({
    name: "",
    email: "",
    password: "",
  });
  //reference to inputs error messages
  const refName = useRef();
  const refEmail = useRef();
  const refPass = useRef();

  //Check Error in every element
  let errorE = {
    name: true,
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
      case "name":
        const name = inputs.current.name;

        if (name.length < 2 && !checkFirstTime) {
          refName.current.style.display = "block";
          errorE = { ...errorE, name: true };
        } else {
          refName.current.style.display = "none";
          errorE = { ...errorE, name: false };
        }
        break;
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
  //submit function to send data
  function Submitt(e) {
    e.preventDefault();

    //variable we use to prevent error messages appeare first time
    checkFirstTime = false;
    let formData = new FormData();
    formData.append("name", inputs.current.name);
    formData.append("email", inputs.current.email);
    formData.append("password", inputs.current.password);
    //check before submit
    check("name");
    check("email");
    check("password");

    //if our object elements are all true then Pass
    if (
      errorE.name !== true &&
      errorE.email !== true &&
      errorE.password !== true
    ) {
      dispatch(
        addUser({
          formData,
          baseUrl,
          InOrUp: "up",
        })
      ).then((res) => {
        console.log(res);
        /*  if (res.payload.response.status == 409) {
            errorEmailTaken();
          }*/
        if (res.payload == "Email address already taken") {
          errorEmailTaken();
        } else {
          nav("/");
        }
      });
    }
  }
  return (
    <>
      {loading ? (
        <div className="m-auto h-full flex items-center ">
          <Loading />
        </div>
      ) : (
        <div className=" w-3/6 h-full flex justify-center items-center tab:w-full ">
          <form
            method="post"
            className="flex bg-none tab:items-center flex-col justify-between p-5 py-7 w-full h-full  "
            onSubmit={Submitt}
          >
            <input
              className="input "
              type="text"
              name="name"
              id="Name"
              placeholder="Enter Your Name"
              onChange={handleInputs}
              required
            />
            {
              <p className="error" ref={refName}>
                Name can not be less than 2 characters
              </p>
            }
            <input
              className="input "
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              onChange={handleInputs}
              required
            />
            <p className="error" ref={refEmail}>
              Invalid Email
            </p>
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              onChange={handleInputs}
              required
            />
            <p className="error" ref={refPass}>
              Password Must be more than 7 chars and contain small and capital
              letters and numbers
            </p>

            <button className=" btn mb-4" onChange={handleInputs}>
              Sign Up
            </button>
            <span className="text-black text-lg">
              You Already Have An Account ?{" "}
              <Link to="/auth/signIn" className="text-orange-600 text-lg">
                Sign In
              </Link>{" "}
            </span>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
