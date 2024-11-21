import React, { useContext } from "react";
import user from "./../assets/userLogo.svg";
import settings from "./../assets/settings.svg";
import logout from "./../assets/logout.svg";
import { Context } from "../StoreContext";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setShowSidebar }) => {
  const { createNewChatList, setToken } = useContext(Context);
  const pageroute = useNavigate();
  const settingsList = [
    {
      img: settings,
      name: "Settings",
      handleClick: () => {
        pageroute("/settings");
      },
    },
    {
      img: logout,
      name: "Logout",
      handleClick: () => {
        setToken("");
      },
    },
  ];

  return (
    <div className="fixed flex justify-between top-0 right-0 left-0 py-2 z-10 px-10 bg-primary items-center max-w-6xl m-auto max-md:px-4">
      <div className="flex items-center gap-2">
        <Tippy content="Open Sidebar">
        <div
          className="p-2 hover:bg-indigo-950 duration-[250ms] rounded-md cursor-pointer"
          onClick={() => setShowSidebar(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
              clipRule="evenOdd"
            ></path>
          </svg>
        </div>
        </Tippy>
        <Tippy content="Create New Chat">
          <div
            className="p-2 hover:bg-indigo-950
        duration-[250ms] rounded-md
        cursor-pointer
        "
            onClick={() => createNewChatList()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="icon-xl-heavy"
            >
              <path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4" />
            </svg>
          </div>
        </Tippy>
        <Link className="font-medium text-lg" to={"/"}>
          VITNest
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Tippy content="Share">
        <div
          className="p-2 hover:bg-indigo-950 duration-[250ms] rounded-md
        cursor-pointer"
          onClick={() =>
            window.open(
              `https://api.whatsapp.com/send?text= Visit my alternative Website called movie hub , https://ricky-moviehub.netlify.app`,
              "_blank"
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width={28}
            height={28}
            viewBox="0 0 24 24"
            className="icon-xl-heavy"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 6.414V15a1 1 0 1 1-2 0V6.414L8.707 8.707a1 1 0 0 1-1.414-1.414zM4 14a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3a1 1 0 0 1 1-1"
              clipRule="evenodd"
            />
          </svg>
        </div>
        </Tippy>
        <details className="hover:bg-indigo-950 duration-[250ms] rounded-[50%] cursor-pointer relative">
          <summary className="list-none">
            <img src={user} className="object-cover w-8" alt="" />
          </summary>
          <div className="absolute bg-indigo-950 top-[130%] rounded-lg right-0 p-2">
            {settingsList.map((item, idx) => (
              <div
                key={idx}
                className="hover:bg-secondary rounded-md flex gap-3 items-center pl-1 pr-3 py-2"
                onClick={() => {
                  item.handleClick();
                }}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <img className="w-6 h-6" src={item.img} />
                </div>
                <div>{item.name}</div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default Header;
