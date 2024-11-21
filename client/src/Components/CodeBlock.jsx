import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import copy from "./../assets/copy.svg";
import tick from "./../assets/tick.svg";

const CodeBlock = ({ children, language }) => {

  const customTheme = {
    'code[class*="language-"]': {
      color: "#f8f8f2",
      background: "rgb(0,0,0)",
      fontFamily: "'Fira Code', 'Fira Mono', monospace",
      fontSize: "14px",
      textAlign: "left",
      whiteSpace: "pre",
      wordSpacing: "normal",
      wordBreak: "normal",
      wordWrap: "normal",
      lineHeight: "1.5",
      tabSize: "4",
      hyphens: "none",
    },
    'pre[class*="language-"]': {
      color: "#f8f8f2",
      background: "rgba(0,0,0,1)",
      fontFamily: "'Fira Code', 'Fira Mono', monospace",
      fontSize: "1em",
      textAlign: "left",
      whiteSpace: "pre",
      wordSpacing: "normal",
      wordBreak: "normal",
      wordWrap: "normal",
      lineHeight: "1.5",
      tabSize: "4",
      hyphens: "none",
      padding: "1em",
      margin: ".5em 0",
      overflow: "auto",
    },
    keyword:{color:"#2e95d3"},
    comment: { color: "#ffffff80" },
    prolog: { color: "white" },
    doctype: { color: "#6272a4" },
    cdata: { color: "#6272a4" },
    punctuation: { color: "#f8f8f2" },
    ".namespace": { opacity: 0.7 },
    property: { color: "#00a67d" },
    tag: { color: "#00a67d" },
    constant: { color: "#00a67d" },
    symbol: { color: "#00a67d" },
    deleted: { color: "#00a67d" },
    boolean: { color: "#2e95d3" },
    number: { color: "#df3079" },
    unit:{color:"#df3079"},
    hexcode:{color:"#df3079"},
    selector: { color: "#f22c3d" },
    "attr-name": { color: "#df3079" },
    string: { color: "#00a67d" },
    char: { color: "#00a67d" },
    macro:{color:"#2e95d3"},
    builtin: { color: "#e9950c" },
    inserted: { color: "#00a67d" },
    operator: { color: "#f8f8f2" },
    entity: { color: "#00a67d", cursor: "help" },
    meta:{color:"#ffffff99"},
    url: { color: "#f8f8f2" },
    ".language-css .token.string": { color: "#f8f8f2" },
    ".style .token.string": { color: "#f8f8f2" },
    variable: { color: "#f8f8f2" },
    atrule: { color: "#00a67d" },
    "attr-value": { color: "#00a67d" },
    function: { color: "#f22c3d" },
    "class-name": { color: "#f8f8f2" },
    regex: { color: "#f8f8f2" },
    important: { color: "#ffb86c", fontWeight: "bold" },
    bold: { fontWeight: "bold" },
    italic: { fontStyle: "italic" },
  };

  const [copied,setCopied]=useState(false);

  return (
    <div className="flex flex-col rounded-md overflow-hidden my-3 max-w-[712px] codeblock">
      <div className="flex items-center justify-between bg-secondary px-4 py-2 text-md text-gray-500 text-sm">
        <div>
          {language}
        </div>
        <div className="flex items-center gap-1 cursor-pointer text-gray-300"
        onClick={()=>{
          navigator.clipboard.writeText(children)
          setCopied(true)
          setTimeout(()=>{
            setCopied(false)
          },2000)
        }}
        >
          <img src={copied?tick:copy} alt="" className="w-4" />
          {copied?"Copied":"Copy code"}
        </div>
      </div>
      <SyntaxHighlighter language={language=="c++"?"cpp":language}  style={customTheme} className="codeblock min-w-[100%]">
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock