import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./layouts/auth";
import Main from "./layouts/main";
import ForgotPasswordPage from "./components/pages/forgotPasswordPage";
import ResetPasswordPage from "./components/pages/resetPasswordPage";
import UserAccountPage from "./components/pages/userAccountPage";
import OrderHistoryPage from "./components/pages/orderHistoryPage";
import OrderDetailsPage from "./components/pages/orderDetailsPage";
import MainPage from "./components/pages/MainPage";
import ProductPage from "./components/pages/productPage";
import ProductListPage from "./components/pages/productListPage";
import ConfirmEmail from "./components/pages/confirmEmail";
import AccountSetupPage from "./components/pages/accountSetupPage";
import BusinessProfilePage from "./components/pages/businessProfilePage";
import ProductListRegistrationPage from "./components/pages/productListRegistrationPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<MainPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="productList" element={<ProductListPage />} />
          <Route path="personalAccount" element={<UserAccountPage />} />
          <Route path="orderHistory" element={<OrderHistoryPage />} />
          <Route
            path="orderHistory/4784437395989684"
            element={<OrderDetailsPage />}
          />
          <Route path="help" element={<p> Help </p>} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        <Route path="auth" element={<Auth />} />

        <Route path="account-setup" element={<AccountSetupPage />} />
        <Route path="business-profile" element={<BusinessProfilePage />} />
        <Route
          path="product-list-registration"
          element={<ProductListRegistrationPage />}
        />
        <Route path="forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="resetPassword" element={<ResetPasswordPage />} />
        <Route path="register/email-confirmation" element={<ConfirmEmail />} />
      </Routes>
    </div>
  );
}

export default App;
