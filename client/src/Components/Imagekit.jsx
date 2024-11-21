import React, { useRef } from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";

const publicKey = "public_5HbyaSrUy6d3otUZ8cW1Uv3jF2o=";
const urlEndpoint = "https://ik.imagekit.io/z4cybkytu/";

const Imagekit = ({ setMedia, ikUploadRefTest }) => {
  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3000/img/upload");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err) => {
    console.log("Error", err);
    toast.error("Something went wrong while uploading the file");
    setMedia({ loaded: 0, src: "", aiData: {}, dbData: {}, filename: "" });
  };

  const onSuccess = (res) => {
    setMedia((prev) => ({ ...prev, loaded: 100, dbData: res }));
  };

  const onUploadProgress = (progress) => {
    setMedia((prev) => ({
      ...prev,
      loaded: (progress.loaded / progress.total) * 100,
    }));
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[evt.target.files.length - 1];
    console.log(file);

    setMedia((prev) => ({
      aiData: {},
      loaded: 0,
      dbData: {},
      src: URL.createObjectURL(file),
      filename: file.name,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setMedia((prev) => ({
        ...prev,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Tippy content="Attach File">
      <div className="imagekit">
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          <IKUpload
            fileName="mediafiles"
            onError={onError}
            onSuccess={onSuccess}
            useUniqueFileName={true}
            onUploadProgress={onUploadProgress}
            onUploadStart={onUploadStart}
            style={{ display: "none" }}
            ref={ikUploadRefTest}
          />
          {ikUploadRefTest && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => ikUploadRefTest.current.click()}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
          {/* <p>Abort upload request</p> */}
          {/* {ikUploadRefTest && (
          <button onClick={() => ikUploadRefTest.current.abort()}>
            Abort request
          </button>
        )} */}
        </IKContext>
      </div>
    </Tippy>
  );
};

export default Imagekit;
