import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./layouts/auth";
import Main from "./layouts/main";
import ForgotPasswordPage from "./components/pages/forgotPasswordPage";
import ResetPasswordPage from "./components/pages/resetPasswordPage";
import UserAccountPage from "./components/pages/userAccountPage/userAccountPage";
import MainPage from "./components/pages/MainPage/MainPage";
import ProductPage from "./components/pages/ProductPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<MainPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="/personalAccount" element={<UserAccountPage />} />
          <Route path="auth" element={<Auth />} />
          <Route path="forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="resetPassword" element={<ResetPasswordPage />} />
          <Route path="help" element={<p> Help </p>} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
