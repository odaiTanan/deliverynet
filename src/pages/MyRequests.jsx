import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading";
const MyRequests = () => {
  const baseUrl = useSelector((state) => state.baseUrl);
  const token = useSelector((state) => state.user?.user?.token);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const [requests, setRequests] = useState([[""]]);
  //get all user for the user
  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);
    axios
      .post(baseUrl + "filter/requests.php", formData)
      .then((res) => {
        setRequests([res.data]);
      })
      .catch((e) => {
        // if (e.response.status == 401) {
        nav("/auth/signIn");
        //}
      });
  }, []);
  async function deleteRequest(id) {
    try {
      const formDataDeleteToken = new FormData();
      formDataDeleteToken.append("token", token);
      setLoading(true);
      const res = await axios.post(
        `${baseUrl}delete/request.php?id=${id}`,
        formDataDeleteToken
      );
      setLoading(false);
      deleteMessage();
      setUpdate(!update);
    } catch (e) {
      nav("/auth/signIn");
    }
  }
  const requestsShow = requests[0].map((req, index) => {
    return (
      <div
        key={index}
        className="w-full flex rounded-xl mb-5  flex-wrap justify-between items-center request"
      >
        <div className=" felx flex-col items-start justify-between">
          <h1 className="font-bold text-[20px] items text-orange-600">
            {req.items}
          </h1>
          <h1 className="font-bold text-[20px] text-white"> {req.user_name}</h1>
          <p className="text-gray-300">{req.address}</p>
          <p className="text-gray-400">{req.phone}</p>
        </div>
        <div>
          <h1 className="font-bold mx-3 mobile:!text-[17px] text-[20px] bg-white text-orange-600 px-2 rounded-xl">
            {req.price}$
          </h1>
        </div>
        <div className="flex mt-3  w-full justify-between mobile:justify-between mobile:w-full  items-center">
          <i
            onClick={() => deleteRequest(req.id)}
            className="fa solid fa-trash mx-2 tab:!text-[17px]"
          ></i>
          <div className="text-white">
            {req.status == "1"
              ? "Food Processing"
              : req.status == "2"
              ? "Out For Delivery"
              : "Delivered"}
          </div>
        </div>{" "}
      </div>
    );
  });
  return (
    <div className="pt-5">
      <div className="w-full my-5  flex justify-center">
        <Link
          to="/"
          className="btn mt-2 !w-[200px]    tab:!w-[200px] tab:!text-[15px] cursor-pointer !p-[2] !text-[18px]"
        >
          Home
        </Link>
      </div>{" "}
      {loading ? <Loading /> : requestsShow}
    </div>
  );
};

export default MyRequests;
