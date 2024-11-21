import React, { useContext, useEffect, useRef, useState } from "react";
import send from "./../assets/send.svg";
import cross from "./../assets/cross.svg";
import pdf from "./../assets/pdf.svg";
import ReactTextareaAutosize from "react-textarea-autosize";
import { Context } from "../StoreContext";
import Imagekit from "./Imagekit";
import Tippy from "@tippyjs/react";

const InputBox = () => {
  const textRef = useRef(null);
  const [input, setInput] = useState("");
  const [scrollY, setScrollY] = useState(true);
  const ikUploadRefTest = useRef(null);

  const { fetchRequest, media, setMedia, deleteImage } = useContext(Context);

  const handleClick = () => {
    if (input.trim() && (media.src == "" || media.loaded == 100)) {
      fetchRequest(input.trim());
      // setTimeout(() => {
        setInput("");
      // }, 10);
    }
  };

  useEffect(() => {
    const handleChange = (e) => {
      if (e.shiftKey && e.key == "Escape") {
        e.preventDefault();
        textRef.current.focus();
      }
    };
    const handleScroll = () => {
      if (
        document.body.scrollHeight -
          (window.scrollY + document.documentElement.clientHeight) <
        50
      ) {
        setScrollY(false);
      } else {
        setScrollY(true);
      }
    };
    handleScroll();

    document.addEventListener("keydown", handleChange);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("keydown", handleChange);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log(media);

  return (
    <div className="fixed bg-primary bottom-0 left-0 right-0 flex flex-col items-center justify-center p-5 pb-3 z-10">
      <div className="w-full max-w-3xl relative">
        {scrollY && (
          <div
            className="absolute -top-16 left-[50%] -translate-x-[50%] cursor-pointer p-2 bg-indigo-950 rounded-full border-[1px]  border-[rgba(255,255,255,0.1)]"
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 21a1 1 0 0 1-.707-.293l-7-7a1 1 0 1 1 1.414-1.414L11 17.586V4a1 1 0 1 1 2 0v13.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-7 7A1 1 0 0 1 12 21"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}
        {/* {media.dbData.url && (
          <IKImage
            urlEndpoint={"https://ik.imagekit.io/z4cybkytu/"}
            path={media.dbData.filePath}
            // height="50"
            // width="50"
            style={{
              maxWidth: "80px",
              maxHeight: "80px",
              objectFit: "cover",
            }}
            className="ml-4 mb-4 rounded-xl"
            // transformation={[{ height: 2000, width: 2000 }]}
            loading="lazy"
          />
        )} */}
        {/* {media.dbData.url && (
          <media
            src={media.dbData.url}
            style={{
              maxWidth: "80px",
              maxHeight: "80px",
              objectFit: "cover",
            }}
            className="ml-4 mb-4 rounded-xl"
            alt=""
          />
        )} */}
        {media.src &&
        media?.aiData?.inlineData?.mimeType.split("/")[0] == "image" ? (
          <div className="relative inline-block ml-4 mb-4  cursor-pointer">
            {media.loaded != 100 && (
              <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center rounded-xl right-0 text-xs font-bold">
                {Math.floor(media.loaded)}%
              </div>
            )}
            <div
              className="absolute w-5 bg-secondary p-1 rounded-full -right-2 -top-2"
              onClick={async () => {
                if (media.loaded != 100) ikUploadRefTest.current.abort();
                else await deleteImage(media.dbData.fileId);
                setMedia({ loaded: 0, src: "", aiData: {}, dbData: {} });
              }}
            >
              <img src={cross} alt="" />
            </div>
            <img
              className={`rounded-lg object-cover max-h-[80px] min-h-[40px] min-w-[40px] max-w-[80px] 
              ${media.loaded != 100 && " opacity-25"} bg-gray-900`}
              src={media.src}
              alt=""
            />
          </div>
        ) : (
          media.src && (
            <div className="ml-4 mb-4 relative max-w-[280px]">
              <div className="flex gap-3 p-2 rounded-[10px] border-[#ececec] border-[.5px] max-w-[280px] cursor-pointer">
                <div className="relative min-w-[36px]">
                  {media.loaded != 100 && (
                    <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center right-0 text-xs font-bold bg-[rgba(0,0,0,.9)] rounded-md">
                      {Math.floor(media.loaded)}%
                    </div>
                  )}
                  <img src={pdf} alt="" />
                </div>
                <div className="flex flex-col overflow-hidden text-ellipsis w-full max-w-[250px] text-sm">
                  <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {media.filename}
                  </div>
                  <div className="uppercase text-xs ">
                    {media?.filename.split(".")[1]}
                  </div>
                </div>
              </div>
              <div
                className="absolute w-5 bg-secondary p-1 rounded-full -right-2 -top-2 cursor-pointer"
                onClick={async () => {
                  if (media.loaded != 100) ikUploadRefTest.current.abort();
                  else await deleteImage(media.dbData.fileId);
                  setMedia({ loaded: 0, src: "", aiData: {}, dbData: {} });
                }}
              >
                <img src={cross} alt="" />
              </div>
            </div>
          )
        )}
        <div
          className="absolute bottom-[20px] 
            left-5
            cursor-pointer
            "
        >
          <Imagekit setMedia={setMedia} ikUploadRefTest={ikUploadRefTest} />
        </div>
        <ReactTextareaAutosize
          minRows={1}
          maxRows={4}
          ref={textRef}
          placeholder="Message VITNest"
          className="py-3 rounded-3xl
            px-14
            w-full bg-indigo-950
            outline-none
            placeholder:text-gray-500
            text-white resize-none 
            scrollbar-hidden
            leading-7
            text-[16px]
            "
          style={{
            scrollbarWidth: "none",
          }}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key == "Enter") {
              handleClick();
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Tippy content={input.trim()?"Send":"Message Empty"}>
        <div
          className={`absolute bottom-[15px] 
            right-2
            bg-white
            ${
              input.trim() && (media.src == "" || media.loaded == 100)
                ? " opacity-100 cursor-pointer hover:opacity-50 duration-200"
                : "opacity-40"
            }
            rounded-full
            `}
          onClick={handleClick}
        >
          <img src={send} className="w-8 h-8" alt="" />
        </div>
        </Tippy>
      </div>
      <div className="text-xs pt-1 text-gray-200">
        VITNest can make mistakes. Check important info.
      </div>
    </div>
  );
};

export default InputBox;
