import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./layouts/auth";
import Main from "./layouts/main"
import NavBar from "./components/ui/navBar";
import ForgotPasswordPage from "./components/pages/forgotPasswordPage";
import ConfirmEmail from "./components/pages/confirmEmail";



function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes >
        <Route path="/" element={< Main />} />
        <Route path="login" element={<Auth />}>
        </Route>
        <Route path="forgotPasswordPage" element={< ForgotPasswordPage />} />
        <Route path="confirmEmail" element={<ConfirmEmail />} />
        <Route path="help" element={<p> Help </p>} />
      </Routes>
    </div>
  );
}

export default App;