import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import DashNav from "./DashNav";
import "./dashboard.css";
const Dashboard = () => {
  return (
    <div className="relative h-screen w-full flex justify-start flex-col items-center gap-11">
      <DashNav />
      <Sidebar />
      <div className="w-[95%] flex justify-center ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
