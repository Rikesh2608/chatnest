import ReactMarkdown from "react-markdown";
import React, { useEffect, useState } from "react";
import copy from "./../assets/copy.svg";
import tick from "./../assets/tick.svg";
import dislike from "./../assets/dislike.svg";
import like from "./../assets/like.svg";
import pdf from "./../assets/pdf.svg";
import logo from "./../assets/logo.png";
import regenerate from "./../assets/regenerate.svg";
import speaker from "./../assets/speaker.svg";
import CodeBlock from "./CodeBlock";
import remarkGfm from "remark-gfm";
import Tippy from "@tippyjs/react"

const MessageBox = ({ role, text, media,mediatype,filename, idx }) => {
  const [copied, setCopied] = useState(false);
  const convertToMarkdownList = (text) => {
    if (!text) return [];
    const items = text.split("* ").filter((item) => item.trim() !== "");
    return items.map((item) => `${item.trim()}`);
  };
  return (
    <div
      className={`
        ${
          role === "user" ?
          " max-w-lg max-lg:max-w-md max-md:max-w-sm max-sm:max-w-[80%] break-words flex flex-col gap-2 items-end self-end":"self-start max-w-full" 
        }
        text-gray-50
      `}
    >
      {role === "user" ? (
        <>
          {media && (
            <div>
              {
                mediatype && mediatype.split("/")[0].toLowerCase()=="image"?
                <img
                  src={media}
                  alt=""
                  className="rounded-lg max-w-full max-h-[300px]"
                />:(
                  <a href={media} target="_blank" className="flex gap-3 p-2 rounded-[10px] border-[#ececec] border-[.5px]  cursor-pointer">
                    <img src={pdf} alt="" />
                    <div className="flex flex-col overflow-hidden text-ellipsis w-[250px]">
                      <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{filename}</div>
                      <div className="uppercase text-xs ">{filename && filename.split(".")[1]}</div>
                    </div> 
                  </a>
                )
              }
            </div> 
          )}
          <div className="whitespace-pre-wrap bg-indigo-950 px-5 py-3 rounded-3xl rounded-tr-sm">
            {text}
          </div>
        </>
      ) : (
        <div className="flex gap-4">
          <img
            src={logo}
            className="border-gray-500 border-[.5px] p-2 rounded-full w-10 h-10"
            alt=""
          />
          <div className={`flex flex-col gap-5 flex-1`}>
            {text && (
              <ReactMarkdown
                className="model-answer flex flex-col min-w-[100%]"
                components={{
                  pre: ({ node, children }) => {
                    if (
                      node.children.length === 1 &&
                      node.children[0].tagName === "code"
                    ) {
                      const childNode = node.children[0];
                      const { value } = childNode.children[0];
                      const className = childNode.properties.className || [];
                      const language = className[0]
                        ? className[0].replace("language-", "")
                        : "output";

                      return <CodeBlock language={language}>{value}</CodeBlock>;
                    }
                    return <p>{children}</p>;
                  },
                  a: ({ node, ...props }) => (
                    <a href={props.href} target="_blank">
                      {props.children}
                    </a>
                  ),
                  table: ({ node, ...props }) => (
                    <div className="table-scroll">
                      <table
                        border="2"
                        className="border-gray-500 border-collapse"
                      >
                        {props.children}
                      </table>
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="custom-thead bg-indigo-950" {...props} />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody className="custom-tbody text-sm" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="custom-th text-left whitespace-nowrap !font-medium border-gray-600 border p-2"
                      {...props}
                      valign="top"
                    />
                  ),
                  td: ({ node, ...props }) => {
                    if (typeof props.children === "object") {
                      return (
                        <td
                          valign="top"
                          className="py-2 px-4 border border-gray-600"
                        >
                          {props.children}
                        </td>
                      );
                    } else {
                      const text = convertToMarkdownList(props.children);

                      return (
                        <td
                          valign="top"
                          className="py-2 px-4 border border-gray-600"
                        >
                          {text.length == 1
                            ? text
                            : text.map((item) => (
                                <li className="list-none overflow-hidden">
                                  - {item}
                                </li>
                              ))}
                        </td>
                      );
                    }
                  },
                }}
                remarkPlugins={[remarkGfm]}
              >
                {text}
              </ReactMarkdown>
            )}
            {role == "model" ? (
              <div className="flex items-center">
                <Tippy content="Speak Aloud">
                  <img
                    src={speaker}
                    className="w-9 cursor-pointer hover:bg-indigo-950 p-2 rounded-lg"
                    alt=""
                    onClick={() => {
                      const speak = () => {
                        const voices = window.speechSynthesis.getVoices();
                        if (voices.length > 0) {
                          const speech = new SpeechSynthesisUtterance(document.querySelectorAll(".model-answer")[Math.floor(idx/2)].textContent);
                          speech.pitch = 1;
                          speech.voice = voices[4];
                          speech.volume=100;
                          speech.rate=1.2
                          window.speechSynthesis.speak(speech);
                        } else {
                          console.log("No voices available.");
                        }
                      };
                      if (window.speechSynthesis.getVoices().length > 0) {
                        speak();
                      } else {
                        window.speechSynthesis.onvoiceschanged = () => {
                          speak();
                        };
                      }
                    }}
                  />
                </Tippy>
                <Tippy content={copied?"Copied":"Copy"}>
                  <img
                    src={copied ? tick : copy}
                    alt="Copy"
                    className="cursor-pointer w-9 hover:bg-indigo-950 p-2 rounded-lg"
                    onClick={() => {
                      if (!copied) {
                        setCopied(true);
                        navigator.clipboard.writeText(
                          document.querySelectorAll(".model-answer")[
                            Math.floor(idx / 2)
                          ].textContent
                        );
                        setTimeout(() => {
                          setCopied(false);
                        }, 2000);
                      }
                    }}
                  />
                </Tippy>
                <Tippy content="Good Response">
                  <img
                    src={like}
                    className="w-9 cursor-pointer hover:bg-indigo-950 p-2 rounded-lg"
                    alt=""
                  />
                </Tippy>
                <Tippy content="Bad Response">
                  <img
                    src={dislike}
                    alt=""
                    className="w-9 cursor-pointer hover:bg-indigo-950 p-2 rounded-lg"
                  /> 
                </Tippy>
                <Tippy content="Regenerate">
                  <img
                    src={regenerate}
                    className="w-9 cursor-pointer hover:bg-indigo-950 p-2 rounded-lg"
                    alt=""
                  />
                </Tippy>
              </div>
            ) : (
              <div
                className="mx-4 mt-2 w-6 h-6
              bg-white rounded-full animate-pulse"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
