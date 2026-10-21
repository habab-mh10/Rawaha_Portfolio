import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from './admin/context/AuthContext.jsx';

const redirect = sessionStorage.redirect;

if (redirect) {
  delete sessionStorage.redirect;

  window.history.replaceState(
    null,
    null,
    redirect
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  </BrowserRouter>
);