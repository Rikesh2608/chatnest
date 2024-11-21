import React, { useContext, useEffect, useState } from "react";
import logo from "./../assets/logo.png";
import cross from "./../assets/cross.svg";
import more from "./../assets/three-dot-horizontal.svg";
import userLogo from "./../assets/userLogo.svg";
import { Context } from "../StoreContext";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";

const SideBar = ({ showSideBar, setShowSideBar }) => {
  const { chatList, createNewChatList, user } = useContext(Context);
  const [showOptions, setShowOptions] = useState({
    id: "",
    rename: false,
    delete: false,
    title: "",
  });

  useEffect(() => {
    setShowOptions({
      id: "",
      rename: false,
      delete: false,
      title: "",
    });
  }, [showSideBar]);

  // console.log(chatList);

  return (
    <>
      {(showSideBar || showOptions.rename || showOptions.delete) && (
        <div
          className={`fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.3)]  overlay ${
            showOptions.rename || showOptions.delete ? "z-40" : "z-20"
          }`}
          onClick={() => setShowSideBar(false)}
        />
      )}
      {showOptions.rename && (
        <RenameChat setShowOptions={setShowOptions} showOptions={showOptions} />
      )}
      {showOptions.delete && (
        <DeleteChat setShowOptions={setShowOptions} showOptions={showOptions} />
      )}
      <div
        className={`fixed top-0 bottom-0 left-0 flex flex-col gap-3 bg-primary z-30 p-4 text-sm 
        duration-[.25s]
        min-w-[300px] max-w-[300px]
        ${
          !showSideBar || showOptions.rename || showOptions.delete
            ? "translate-x-[-100%]"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <Tippy content="Close Sidebar">
            <div
              className="p-2 hover:bg-indigo-950 rounded-md cursor-pointer"
              onClick={() => setShowSideBar(false)}
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
              className="p-2 hover:bg-indigo-950 rounded-md cursor-pointer"
              onClick={() => {
                createNewChatList();
                setShowSideBar(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
                className="icon-xl-heavy"
              >
                <path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4" />
              </svg>
            </div>
          </Tippy>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-3 items-center px-2 cursor-pointer text-lg font-semibold">
            <img
              src={logo}
              alt=""
              className="w-8 p-[6px] border rounded-full"
            />
            <div>ChatNest</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col custom-scrollbar max-h-[68.08vh] flex-1 gap-1">
            {chatList &&
              chatList.map((item, idx) => (
                <ChatList
                  item={item}
                  key={idx}
                  showSideBar={showSideBar}
                  setShowSideBar={setShowSideBar}
                  setShowOptions={setShowOptions}
                  showOptions={showOptions}
                />
              ))}
          </div>
        </div>
        <div className="flex py-1 px-3 items-center gap-3 justify-self-end z-10 bg-primary">
          <img 
            src={userLogo}
            className="w-8 h-8 object-cover rounded-full object-left-top"
            alt=""
          />
          <div className="text-[16px] overflow-hidden whitespace-nowrap text-ellipsis">{user.username}</div>
        </div>
      </div>
    </>
  );
};

const ChatList = ({ item, setShowSideBar, showOptions, setShowOptions }) => {
  const { chats } = useContext(Context);
  // console.log(chats);

  return (
    <div
      className={`flex gap-3 items-center justify-between px-3 duration-[.25s] hover:bg-indigo-950 rounded-md relative ${
        (showOptions.id == item._id || chats._id == item._id) && "bg-indigo-950"
      }`}
      key={item._id}
    >
      <Link
        to={`/chats/${item._id}`}
        className="whitespace-nowrap overflow-hidden text-ellipsis py-2 cursor-pointer flex-1 outline-none"
        onClick={() => {
          if (showOptions.id != item._id) {
            setShowSideBar(false);
          }
        }}
      >
        {item.title}
      </Link>
      <details>
        <summary className="list-none">
          <img
            src={showOptions.id == item._id ? cross : more}
            alt=""
            className="w-5 cursor-pointer"
            onClick={() => {
              setShowOptions((prev) => ({
                ...prev,
                id: prev.id == item._id ? "" : item._id,
                title: prev.id == item._id ? "" : item.title,
              }));
            }}
          />
        </summary>
      </details>
      {showOptions.id == item._id && (
        <div
          className="absolute flex flex-col
        left-[103%] top-2 bg-indigo-950 rounded-md z-10"
        >
          <div
            className="py-2 px-3 flex gap-3 items-center hover:bg-primary cursor-pointer"
            onClick={() =>
              setShowOptions((prev) => ({
                ...prev,
                rename: true,
              }))
            }
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color: "rgb(203, 139, 208)" }}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M3 6h7M3 10h4"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.428 17.572 20.5 10.5a2.828 2.828 0 1 0-4-4l-7.072 7.072a2 2 0 0 0-.547 1.022L8 19l4.406-.881a2 2 0 0 0 1.022-.547"
                ></path>
              </svg>
            </div>
            <div>Rename</div>
          </div>
          <div
            className="py-2 px-3 flex gap-3 items-center text-[rgb(249,58,55)] hover:bg-primary cursor-pointer"
            onClick={() => {
              setShowOptions((prev) => ({
                ...prev,
                rename: false,
                delete: true,
              }));
            }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10.556 4a1 1 0 0 0-.97.751l-.292 1.14h5.421l-.293-1.14A1 1 0 0 0 13.453 4zm6.224 1.892-.421-1.639A3 3 0 0 0 13.453 2h-2.897A3 3 0 0 0 7.65 4.253l-.421 1.639H4a1 1 0 1 0 0 2h.1l1.215 11.425A3 3 0 0 0 8.3 22H15.7a3 3 0 0 0 2.984-2.683l1.214-11.425H20a1 1 0 1 0 0-2zm1.108 2H6.112l1.192 11.214A1 1 0 0 0 8.3 20H15.7a1 1 0 0 0 .995-.894zM10 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>Delete</div>
          </div>
        </div>
      )}
    </div>
  );
};

const RenameChat = ({ showOptions, setShowOptions }) => {
  const [chatTitle, setChatTitle] = useState(showOptions.title);
  const { renameChat } = useContext(Context);

  return (
    <div className="bg-indigo-950  z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-65%] p-4 flex flex-col gap-3 rounded-xl">
      <h1 className="font-normal text-lg">Rename this chat</h1>
      <div className="flex flex-col gap-6 min-w-[300px]">
        <div>
          <input
            type="text"
            onChange={(e) => setChatTitle(e.target.value)}
            value={chatTitle}
            required
            className="w-full bg-indigo-950 border rounded-lg py-2 px-3 outline-none text-sm"
          />
        </div>
        <div className="flex font-medium justify-end text-sm text-[rgb(168,199,250)] ">
          <div
            className="cursor-pointer hover:bg-gray-900 px-3 py-2 rounded-lg"
            onClick={() =>
              setShowOptions((prev) => ({ ...prev, rename: false }))
            }
          >
            Cancel
          </div>
          <div
            className="cursor-pointer hover:bg-gray-900 px-3 py-2 rounded-lg"
            onClick={() => {
              setShowOptions((prev) => ({ ...prev, rename: false }));
              renameChat(showOptions.id, chatTitle);
            }}
          >
            Rename
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteChat = ({ showOptions, setShowOptions }) => {
  const { deleteChat } = useContext(Context);
  return (
    <div className="bg-indigo-950  z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-65%] p-4 flex flex-col gap-3 rounded-xl min-w-[300px] max-w-[400px] w-[45vw]">
      <h1 className="font-normal text-lg">Delete this Chat?</h1>
      <div className="text-xs text-gray-400">
        You'll no longer see this chat here. This will also delete related
        activity like prompts, responses and feedback from your ChatNest
        activity.
      </div>
      <div className="flex font-medium justify-end text-sm text-[rgb(168,199,250)]">
        <div
          className="cursor-pointer hover:bg-gray-900 px-3 py-2 rounded-lg"
          onClick={() => setShowOptions((prev) => ({ ...prev, delete: false }))}
        >
          Cancel
        </div>
        <div
          className="cursor-pointer hover:bg-gray-900 px-3 py-2 rounded-lg"
          onClick={() => {
            setShowOptions((prev) => ({ ...prev, delete: false }));
            deleteChat(showOptions.id);
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default SideBar;
