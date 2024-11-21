import React, { useContext } from "react";
import idea from "./../assets/idea.svg";
import education from "./../assets/education.svg";
import pencil from "./../assets/pencil.svg";
import code from "./../assets/code.svg";
import logo from "./../assets/logo.png";
import { Context } from "../StoreContext";

const Recommendations = () => {
  const { fetchRequest } = useContext(Context);
  const options = [
    {
      name: "Give a project idea on Mern Stack",
      image: idea,
    },
    {
      name: "How to center a div in HTML",
      image: code,
    },
    {
      name: "What is Programming?",
      image: education,
    },
    {
      name: "Write a Story in Action/Thriller genre",
      image: pencil,
    },
  ];
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-12 px-4">
        <div className="flex items-center gap-5">
          <img src={logo} alt="" className="w-12 opacity-60" />
          <h1 className="bg-gradient-to-r from-[#217bfe] to-[#e55571] text-transparent bg-clip-text text-6xl font-bold ">
            VITNest
          </h1>
        </div>
        <div className=" grid grid-cols-4 gap-5 text-gray-400 max-w-[700px] m-auto max-[800px]:grid-cols-2 max-[450px]:grid-cols-1">
          {options.map((item, idx) => (
            <div
              className="flex flex-col gap-3 border-[.5px] p-3 rounded-2xl border-solid border-[#2c2937] max-w-[200px] min-w-[100px] cursor-pointer
            max-[450px]:max-w-none
            hover:bg-[#1c1840] duration-200
            "
              key={idx}
              onClick={() => fetchRequest(item.name)}
            >
              <img src={item.image} className="w-5" alt="" />
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
