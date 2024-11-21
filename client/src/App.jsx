import React, { useContext, useEffect, useState } from "react";
import Home from "./Components/Home";
import Header from "./Components/Header";
import InputBox from "./Components/InputBox";
import SideBar from "./Components/SideBar";
import { Route, Routes } from "react-router-dom";
import InitialPage from "./Components/InitialPage";
import LoginPage from "./Components/LoginPage";
import { Context } from "./StoreContext";
import axios from "axios";

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const {pageLoading}=useContext(Context)
  // console.log(pageLoading);
  
  return (
    <>
      {pageLoading && <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,.6)] pageloading"> <div className="w-10 h-10 animate-spin border-r-2 border-t-2 rounded-full"/></div>}
      <Routes>
        <Route
          path={"/chats/:id"}
          element={
            <>
              <Header setShowSidebar={setShowSideBar} />
              <InputBox />
              <div className="pt-[100px] pb-[200px]">
                <Home />
              </div>
              <SideBar
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
              />
            </>
          }
        />
        <Route path="/" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </>
  );
};

export default App;
