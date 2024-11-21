import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StoreContext from "./StoreContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContext>
      <div
        className={`
      bg-primary
        text-white px-5 min-h-[100vh]`}
      >
        <App />
        <ToastContainer 
        position="top-center"
        theme="dark"
        hideProgressBar={true}
        autoClose={3000}
        /> 
      </div>
    </StoreContext>
  </BrowserRouter>
);
// bg-gradient-to-r from-[#1c1840] to-[#0d0c22]
