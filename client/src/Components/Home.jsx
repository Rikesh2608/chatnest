import React, { useContext, useEffect } from "react";
import Recommendations from "./Recommendations";
import MessageBox from "./MessageBox";
import { Context } from "../StoreContext";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { chats,answer,loading,fetchChatData,token } = useContext(Context);
  const {id:chatID}=useParams();
  const pageroute=useNavigate()

  useEffect(()=>{
    fetchChatData(chatID) 
  },[chatID])

  useEffect(()=>{
    if(!token)  pageroute("/login")
  },[token])
  
  return (
    <div>
      {chats?.history?.length ? (
        <div className="flex flex-col gap-10 max-w-3xl m-auto self-start" > 
          {chats?.history?.map((item, idx) => (
            <MessageBox role={item.role} text={item.text} filename={item.filename}  media={item.media} mediatype={item.mediatype}  key={idx} idx={idx}/>
          ))} 
          {(answer || loading) && <MessageBox role={"answer"}
            text={answer} 
            />}
        </div> 
      ) : (
        <Recommendations />
      )}
    </div>
  );
};

export default Home;
