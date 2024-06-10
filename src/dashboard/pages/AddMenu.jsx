import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading";
import { baseU } from "../../confing";
import { useSelector } from "react-redux";
const AddUser = () => {
  const emptyError = () => toast.error("Please Fill All Inputs");
  const [image, imageSet] = useState();
  let checkFirstTime = true;
  let nav = useNavigate();

  const token = useSelector((state) => state.user?.user?.token);
  const [loading, setLoading] = useState(false);
  //put input content in this object
  let [inputs, setInputs] = useState({
    name: "",
    price: "",
    type: "",
  });

  //getting inputs content in our object dynamically and send it to check function
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  //a function to check every input requirements
  function check() {
    if ((inputs.name.length < 0 || inputs.email < 0) && !checkFirstTime) {
      emptyError();
      return false;
    } else {
      return true;
    }
  }
  const baseUrl = baseU();
  //submit function to send data
  function Submitt(e) {
    e.preventDefault();
    checkFirstTime = false;
    //variable we use to prevent error messages appeare first time

    let formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("price", inputs.price);
    formData.append("type", inputs.type);
    formData.append("image", image);
    formData.append("token", token);

    //if there is no empty input continue
    if (check()) {
      setLoading(true);
      axios
        .post(`${baseUrl}add/menu.php`, formData)
        .then((res) => {
          setLoading(false);
          nav("/dashboard/menu");
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status == 401) {
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
              encType="multipart/form-data"
              onSubmit={Submitt}
            >
              <input
                className="input "
                type="text"
                name="name"
                id="Name"
                placeholder="Enter The Name"
                onChange={handleInputs}
                required
              />

              <input
                className="input "
                type="file"
                name="image"
                id="image"
                placeholder="Enter The Email"
                onChange={(e) => {
                  imageSet(e.target.files.item(0));
                }}
                required
              />

              <input
                className="input"
                type="text"
                name="price"
                id="price"
                placeholder="Enter The price"
                onChange={handleInputs}
                required
              />
              <select
                className="input"
                type="text"
                name="type"
                id="type"
                onChange={handleInputs}
                required
              >
                <option selected value={null} disabled>
                  Choose Type
                </option>
                <option value="salad">salad</option>
                <option value="rolls">rolls</option>
                <option value="deserts">deserts</option>
                <option value="sandwich">sandwich</option>
                <option value="pure veg">pure veg</option>
                <option value="pasta">pasta</option>
                <option value="noodles">noodles</option>
                <option value="cake">cake</option>
              </select>
              <button className="  btn mb-4">Add Product</button>
            </form>
          </div>
        )}
        <ToastContainer />
      </>{" "}
    </div>
  );
};

export default AddUser;
