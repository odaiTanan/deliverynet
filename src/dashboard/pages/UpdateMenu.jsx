import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import { baseU } from "../../confing";
const UpdateMenu = () => {
  const errorNull = () => toast.error("Please Fill All Inputs");

  let checkFirstTime = true;
  let nav = useNavigate();
  const [image, setImage] = useState();
  const param = useParams();
  const id = param.id;
  const token = useSelector((state) => state.user?.user?.token);
  const baseUrl = baseU();
  const [loading, setLoading] = useState(false);
  //put input content in this object
  let [inputs, setInputs] = useState({
    name: "",
    price: "",
    type: "",
  });
  //show an defined item details
  useEffect(() => {
    const formData1 = new FormData();
    formData1.append("token", token);
    axios
      .post(`${baseUrl}update/menuShow.php?id=${id}`, formData1)
      .then((res) => {
        console.log(res);
        setInputs({
          ...inputs,
          name: res.data.menuInformation.name,
          price: res.data.menuInformation.price,
          type: res.data.menuInformation.type,
        });
        setImage(res.data.menuInformation.image);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        nav("/auth/signIn");
      });
  }, []);

  //getting inputs content in our object dynamically and send it to check function
  function handleInputs(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }
  //a function to check every input requirements
  function check(e) {
    if (inputs.name != "" && inputs.price != "" && inputs.type != "") {
      return true;
    } else {
      errorNull();
      return false;
    }
  }
  //submit function to send data
  function Submitt(e) {
    e.preventDefault();

    //variable we use to prevent error messages appeare first time

    let formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("price", inputs.price);
    formData.append("type", inputs.type);
    formData.append("image", image);
    formData.append("token", token);

    //if our object elements are all true then Pass
    if (check()) {
      setLoading(true);
      axios
        .post(`${baseUrl}update/menu.php?id=${id}`, formData)
        .then((res) => {
          setLoading(false);
          console.log(res);
          nav("/dashboard/menu");
        })
        .catch((err) => {
          setLoading(false);
          //  if (err.response.status == 401) {
          nav("/auth/signIn");
          //}
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
                value={inputs.name}
                required
              />

              <input
                className="input "
                type="file"
                name="image"
                id="image"
                placeholder="not updated"
                onChange={(e) => {
                  setImage(e.target.files.item(0));
                }}
              />

              <input
                className="input"
                type="text"
                name="price"
                id="price"
                placeholder="Enter The price"
                onChange={handleInputs}
                value={inputs.price}
                required
              />
              <select
                className="input"
                type="text"
                name="type"
                id="type"
                value={inputs.type}
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
              <button className="  btn mb-4">Update item</button>
            </form>
          </div>
        )}
        <ToastContainer />
      </>{" "}
    </div>
  );
};

export default UpdateMenu;
