import React from "react";
const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="animate-spin rounded-[50%] h-[200px] w-[200px] flex justify-center items-center ">
        <div className="flex flex-col h-[120px] w-[60px] justify-between items-center">
          <span className=" relative flex h-7 w-7 justify-center items-center">
            <span className="relative inline-flex rounded-full h-7 w-7 bg-orange-600"></span>
          </span>
          <span className=" relative ml-[-20px] flex h-7 w-7 justify-center items-center">
            <span className="relative inline-flex rounded-full h-7 w-7 bg-orange-600"></span>
          </span>
          <span className=" relative flex h-7 w-7 justify-center items-center">
            <span className="relative inline-flex rounded-full h-7 w-7 bg-orange-600"></span>
          </span>
        </div>
        <div className="flex flex-col h-[100px] w-[60px] justify-center items-center">
          <span className=" relative flex h-7 w-7 justify-center items-center">
            <span className="relative inline-flex rounded-full h-7 w-7 bg-orange-600"></span>
          </span>
          <span className=" relative  flex h-9 w-9 m-4 my-[30px] justify-center items-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-9 w-9 bg-orange-600"></span>
          </span>
          <span className=" relative flex h-7 w-7 justify-center items-center">
            <span className="relative inline-flex rounded-full h-7 w-7 bg-orange-600"></span>
          </span>
        </div>
        <div className="flex flex-col h-[120px] w-[60px] justify-between items-center">
          <span className=" relative flex h-7 w-7 justify-center items-center">
            <span className="relative inline-flex rounded-full h-7 w-7 bg-orange-600"></span>
          </span>
          <span className=" relative mr-[-20px] flex h-7 w-7 justify-center items-center">
            <span className="relative inline-flex rounded-full h-7 w-7 bg-orange-600"></span>
          </span>
          <span className=" relative flex h-7 w-7 justify-center items-center">
            <span className="relative inline-flex rounded-full h-7 w-7 bg-orange-600"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
