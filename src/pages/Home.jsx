import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Navbar from "../components/Nav";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const Home = () => {
  return (
    <div className="w-[90%] ">
      <Navbar />
      <Header />

      <Menu />
    </div>
  );
};

export default Home;
