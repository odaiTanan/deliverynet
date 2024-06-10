import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading";
import { baseU } from "../../confing";
import { useSelector } from "react-redux";
const AddUser = () => {
  const errorEmailTaken = () =>
    toast.error("This Email Has Already Been Taken");
  const errorEmailMatch = () => toast.error("Invalid Email");
  const errorName = () =>
    toast.error("Name can not be less than 2 characters ");
  const errorPassword = () =>
    toast.error(
      " Password Must be more than 7 chars and contain small and capital letters and numbers"
    );

  let checkFirstTime = true;
  let nav = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const param = useParams();
  const id = param.id;

  const [loading, setLoading] = useState(false);
  //put input content in this object
  let [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    rule: "97",
  });

  //Check Error in every element
  let errorE = {
    name: true,
    email: true,
    password: true,
  };

  //getting inputs content in our object dynamically and send it to check function
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  //a function to check every input requirements
  function check(e) {
    switch (e) {
      case "name":
        const name = inputs.name;

        if (name.length < 2) {
          errorName();
          errorE = { ...errorE, name: true };
        } else {
          errorE = { ...errorE, name: false };
        }
        break;

      case "password":
        const password = inputs.password;
        if (
          password.length <= 7 ||
          !(
            password.match(/[A-Z]+/) &&
            password.match(/[a-z]+/) &&
            password.match(/\d+/)
          )
        ) {
          errorPassword();
          errorE = { ...errorE, password: true };
        } else {
          errorE = { ...errorE, password: false };
        }
        break;
    }
  }
  const token = useSelector((state) => state.user?.user?.token);
  const baseUrl = baseU();
  //submit function to send data
  function Submitt(e) {
    e.preventDefault();

    //variable we use to prevent error messages appeare first time

    let formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("rule", inputs.rule);
    formData.append("token", token);

    //check before submit
    check("name");

    check("password");

    //if our object elements are all true then Pass
    if (errorE.name !== true && errorE.password !== true) {
      setLoading(true);
      axios
        .post(`${baseUrl}add/user.php`, formData)
        .then((res) => {
          console.log(res);
          setLoading(false);
          nav("/dashboard/users");
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status == 409) {
            errorEmailTaken();
          } else {
            nav("/auth/signIn");
          }
        });
    }
  }
  return (
    <div className="w-[70%] tab:w-[80%] flex justify-center items-center">
      {" "}
      <>
        {loading ? (
          <div className="m-auto h-full flex items-center ">
            <Loading />
          </div>
        ) : (
          <div className=" w-full h-full flex justify-center items-center  ">
            <form
              method="post"
              className="flex bg-none tab:items-center gap-5 flex-col justify-between items-center p-5 py-7 w-full h-full  "
              onSubmit={Submitt}
            >
              <input
                className="input "
                type="text"
                name="name"
                id="Name"
                placeholder="Enter The Name"
                onChange={handleInputs}
                value={inputs.name}
                required
              />
              {}
              <input
                className="input "
                type="email"
                name="email"
                id="email"
                placeholder="Enter The Email"
                onChange={handleInputs}
                value={inputs.email}
                required
              />

              <input
                className="input"
                type="password"
                name="password"
                id="password"
                placeholder="Enter The Password"
                onChange={handleInputs}
                required
              />

              <select
                name="rule"
                value={inputs.rule}
                id="rules"
                className="bg-slate-800  mobile:w-full text-orange-500 p-3"
                onChange={handleInputs}
              >
                <option value="97">user</option>
                <option value="98">delivery status manager</option>
                <option value="99">admin</option>
              </select>

              <button className="  btn mb-4">Add User</button>
            </form>
          </div>
        )}
        <ToastContainer />
      </>{" "}
    </div>
  );
};

export default AddUser;
