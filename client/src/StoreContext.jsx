import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";
// console.log(import.meta.env.VITE_API_KEY)

export const Context = createContext();

const StoreContext = ({ children }) => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [chats, setChats] = useState({
    history: [],
  });
  const uri = "https://chatnest-backend-ky2l.onrender.com";
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  
  const [chatList, setChatList] = useState(
    JSON.parse(localStorage.getItem("chat-queries")) || []
  );
  const [chatModel, setChatModel] = useState(
    model.startChat({
      history: chats.history.map((item, idx) => ({
        role: item.role,
        parts: [{ text: item.text }],
      })),
    })
  );
  const [media, setMedia] = useState({
    loaded: 0,
    dbData: {},
    aiData: {},
    src: "",
  });
  const [token, setToken] = useState(
    localStorage.getItem("vitnest-login-token") || ""
  );
  const [pageLoading,setPageLoading]=useState(false) 

  useEffect(() => {
    setChatModel(
      model.startChat({
        history: chats.history.map((item, idx) => ({
          role: item.role,
          parts: [{ text: item.text }],
        })),
      })
    )
  }, [chats._id]);

  const fetchRequest = async (prompt) => {
    const userPrompt = {
      role: "user",
      text: prompt,
      media: media.dbData.url,
      mediatype: media.aiData?.inlineData?.mimeType,
      filename:media.filename
    };
    setMedia({ loaded: 0, aiData: {}, dbData: {}, src: "" });
    setChats((prev) => ({
      ...prev,
      history: [...prev.history, userPrompt],
    })); 
    let modelOutput;
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    setLoading(true);
    let generatedText = "";
    try {
      const result = await chatModel.sendMessageStream(
        Object.entries(media.aiData).length ? [media.aiData, prompt] : [prompt]
      );

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        generatedText += chunkText;
        setAnswer(generatedText);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }

      modelOutput = {
        role: "model",
        text: generatedText,
      };
      setChats((prev) => ({
        ...prev,
        history: [...prev.history, modelOutput],
      }));
    } catch (e) {
      console.log(e);
      modelOutput = {
        role: "model",
        text: generatedText
          ? generatedText
          : "Something Went wrong! Try Again.",
      };
      setChats((prev) => ({
        ...prev,
        history: [...prev.history, modelOutput],
      }));
    } finally {
      setAnswer("");
      setLoading(false);
      updateChatList(chats._id, [userPrompt, modelOutput]);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  const updateChatList = async (chatId, message) => {
    try {
      await axios.put(`${uri}/chat`, {
        chatId,
        message,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchChatList = async () => {
    setChatList([]);
    await axios
      .get(`${uri}/chat`, {
        headers: { token },
      })
      .then((res) => {
        if (res.data.success) {
          setChatList(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchChatData = async (id) => {
    try {
      setPageLoading(true)
      const chatList = await axios.get(`${uri}/chat/${id}`,{headers:{token}});
      if (chatList.data.success) {
        setChats(chatList.data.chat);
      } else {
        toast.error(chatList.data.message);
      }
      console.log(chatList.data);
    } catch (err) {
      console.log(err);
    }finally{
      setPageLoading(false)
      window.scrollTo({ top:0, behavior: "smooth" });
    }
  };

  const createNewChatList = async () => {
    try {
      setPageLoading(true)
      const newChat = await axios.post(
        `${uri}/chat/add`,
        {},
        {
          headers: { token },
        }
      );
      // console.log(newChat);
      setChats({ ...newChat.data.data, history: [] });
      setChatList((prev) => [{ ...newChat.data.data, history: [] }, ...prev]);
    } catch (e) {
      console.log(e);
    }finally{
      setPageLoading(false)
      window.scrollTo({ top: 0});
    }
  };

  const deleteChat = async (id) => {
    try {
      await axios.delete(`${uri}/chat/${id}`);
      setChatList((prev) => prev.filter((item) => item._id != id));
      if (chats._id == id) { 
        createNewChatList();
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while deleting the chat");
    }
  };

  const renameChat = async (id, title) => {
    try {
      await axios.post(`${uri}/chat/rename`, {
        id,
        title,
      });
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, try again");
    } finally {
      await fetchChatList();
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`https://chatnest-backend-ky2l.onrender.com/media/delete/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const userDetails = async () => {
    try {
      const res = await axios.get(uri + "/user", {
        headers: { token },
      });
      // console.log(res);
      if (res.data.success) {
        setUser({ username: res.data.username, email: res.data.email });
      } else {
        setUser({ username: "username", email: "email" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(token!=""){
      fetchChatList();
      userDetails();
    }
    // createNewChatList();
    localStorage.setItem("vitnest-login-token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("chat-queries", JSON.stringify(chatList));
  }, [chatList]);

  return (
    <Context.Provider
      value={{
        fetchRequest,
        chats,
        setChats,
        answer,
        loading,
        fetchChatList,
        createNewChatList,
        deleteChat,
        fetchChatData,
        chatList,
        setChatList,
        media,
        setMedia,
        deleteImage,
        renameChat,
        user,
        setUser,
        token,
        setToken,
        pageLoading,
        setPageLoading
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default StoreContext;
