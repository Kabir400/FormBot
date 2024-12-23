import React from "react";
//external imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//imports
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Store from "./components/Store.jsx";

//popups
import CreateFolderPopup from "./components/CreateFolderPopup.jsx";
import CreateFormPopup from "./components/CreateFormPopup.jsx";
import DeleteFolderPopup from "./components/DeleteFolderPopup.jsx";
import DeleteFormPopup from "./components/DeleteFormPopup.jsx";

function App() {
  return (
    <Store>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <CreateFolderPopup />
          <CreateFormPopup />
          <DeleteFolderPopup />
          <DeleteFormPopup />
        </div>
        <ToastContainer />
      </Router>
    </Store>
  );
}

export default App;
