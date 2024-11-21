import React, { useContext, useEffect, useState } from "react";
import user from "../assets/userlogo.svg";
import cross from "../assets/cross.svg";
import google from "../assets/google-logo.svg";
import { Context } from "../StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [login, setLogin] = useState(false);
  const {token,createNewChatList,chatList}=useContext(Context)
  const pageroute=useNavigate()
  useEffect(()=>{
    if(token!=""){
      if(chatList.length)
        pageroute(`/chats/${chatList[0]._id}`) 
      else 
        createNewChatList()
    }
  },[token]) 
  return (
    <div className="min-h-[100vh] bg-[#080715] flex items-center justify-center">
      <div className="bg-gradient-to-r from-[#1c1840] to-[#0d0c22] min-w-[350px] max-w-[400px] w-[50vw] min-h-[100px] rounded-md flex flex-col gap-5 p-5 font-[Outfit] border border-[#26253a]">
        <div className="flex gap-4 items-start">
          <div>
            <img src={user} className="w-10 h-10" alt="" />
          </div>
          <div className="flex-1">
            <h1>{login ? "Login Account" : "Create An Account"}</h1>
            <div className="text-[#8380b9] text-sm">
              {!login ? "Already" : "Don't"} have an account?
              <span
                className="underline hover:text-white cursor-pointer ml-1"
                onClick={() => setLogin(!login)}
              >
                {!login ? "Login" : "Signup"}
              </span>
            </div>
          </div>
          <div className="p-1 bg-secondary rounded-full cursor-pointer">
            <img src={cross} className="w-4" alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <button
            className="bg-[#4a2fc3]
          py-2 rounded-md font-[Outfit] text-sm
          flex justify-center gap-2"
          >
            <img src={google} alt="" className="w-5 h-5" />
            {login?"Login":"Sign up"} with Google
          </button>
        </div>
        <div className="flex gap-5 items-center text-[#8380b9] text-sm">
          <div className="flex-1 h-[1px] bg-[#26253a]"></div>
          <div>Or</div>
          <div className="flex-1 h-[1px] bg-[#26253a]"></div>
        </div>
        {login ? <SignIn setLogin={setLogin} /> : <SignUp setLogin={setLogin} />}
      </div>
    </div>
  );
};

const SignIn = ({setLogin}) => {
  const {setPageLoading,setToken}=useContext(Context)
  const loginUser = async (email, password) => {
    try {
      setPageLoading(true)
      const res = await axios.post("https://chatnest-backend-ky2l.onrender.com/user/login", {
        email,
        password,
      });
      if (!res.data.success) {
        toast.error(res.data.message)
      } else {
        toast.success("Login Successfull");
        setToken(res.data.token)
      }
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }finally{
      setPageLoading(false)
    }
  };

  return (
    <form
      className="flex flex-col gap-3 text-sm text-[#8380b9]"
      onSubmit={(e) => {
        e.preventDefault();
        loginUser(e.target.email.value.toLowerCase(), e.target.password.value);
      }}
    >
      <div className="flex flex-col font-medium gap-1">
        <div>Email*</div>
        <input
          className="border-[.5px] border-[#26253a] text-white font-normal bg-[#0d0b20] outline-none rounded-md py-2 px-2 text-sm placeholder:text-[12px] font-[Outfit] placeholder:text-[#8380b9]"
          type="email"
          required
          onChange={(e)=>e.target.value=e.target.value.toLocaleLowerCase()}
          placeholder="Enter your Email"
          name="email"
        />
      </div>
      <div className="flex flex-col font-medium gap-1">
        <div>Password*</div>
        <input
          className="border-[.5px] border-[#26253a] text-white font-normal bg-[#0d0b20] outline-none rounded-md py-2 px-2 text-sm placeholder:text-[12px] font-[Outfit] placeholder:text-[#8380b9]"
          type="password"
          required
          placeholder="Enter the Password"
          name="password"
        />
        <div className="text-[10px]">Must be atleast 8 Characters</div>
      </div>
      <div className="flex gap-2">
        <input type="checkbox" required />
        <div>I agree with terms & conditions</div>
      </div>
      <div className="flex gap-4">
        <button
          className="flex-1 py-[5px] border-[#8380b9] border rounded-md cursor-pointer"
          type="button"
          onClick={()=>setLogin(prev=>!prev)}
        >
          Create an Account
        </button>
        <button
          className="flex-1 py-[5px] bg-[#4a2fc3] text-white rounded-md"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
};

const SignUp = ({setLogin}) => {
  const {setToken} = useContext(Context);

  const registerUser = async (name, email, password) => {
    try {
      setPageLoading(true)
      const response = await axios.post("https://chatnest-backend-ky2l.onrender.com/user/register", {
        username: name,
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Account Created Successfully");
        setToken(response.data.token)
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }finally{
      setPageLoading(false)
    }
  };

  return (
    <form
      className="flex flex-col gap-3 text-sm text-[#8380b9]"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
        registerUser(
          e.target.name.value,
          e.target.email.value.toLowerCase(),
          e.target.password.value
        );
      }}
    >
      <div className="flex flex-col font-medium gap-1">
        <div>Name*</div>
        <input
          className="border-[.5px] border-[#26253a] text-white font-normal bg-[#0d0b20] outline-none rounded-md py-2 px-2 text-sm placeholder:text-[12px] font-[Outfit] placeholder:text-[#8380b9]"
          type="text"
          required
          placeholder="Enter your Name"
          name="name"
        />
      </div>
      <div className="flex flex-col font-medium gap-1">
        <div>Email*</div>
        <input
          className="border-[.5px] border-[#26253a] text-white font-normal bg-[#0d0b20] outline-none rounded-md py-2 px-2 text-sm placeholder:text-[12px] font-[Outfit] placeholder:text-[#8380b9]"
          type="email"
          required
          placeholder="Enter your Email"
          name="email"
          onChange={e=>e.target.value=e.target.value.toLocaleLowerCase()}
        />
      </div>
      <div className="flex flex-col font-medium gap-1">
        <div>Password*</div>
        <input
          className="border-[.5px] border-[#26253a] text-white font-normal bg-[#0d0b20] outline-none rounded-md py-2 px-2 text-sm placeholder:text-[12px] font-[Outfit] placeholder:text-[#8380b9]"
          type="password"
          required
          placeholder="Create the Password"
          name="password"
        />
        <div className="text-[10px]">Must be atleast 8 Characters</div>
      </div>
      <div className="flex gap-2">
        <input type="checkbox" required />
        <div>I agree with terms & conditions</div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={()=>setLogin(prev=>!prev)}
          className="flex-1 py-[5px] border-[#8380b9] border rounded-md cursor-pointer" >
          Login
        </button>
        <button
          className="flex-1 py-[5px] bg-[#4a2fc3] text-white rounded-md"
          type="submit"
        >
          Signup
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
