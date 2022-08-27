import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./layouts/auth";
import Main from "./layouts/main";
import ForgotPasswordPage from "./components/pages/forgotPasswordPage";
import ResetPasswordPage from "./components/pages/resetPasswordPage";
import MainPage from "./components/pages/MainPage/MainPage";
import ProductPage from "./components/pages/productPage";
import SupplierPage from "./components/pages/supplierPage";
import SellerAccountPage from "./components/pages/sellerAccountPage";
import SupplierAccountMainPage from "./components/pages/supplierPage/supplierAccountMainPage/supplierAccountMainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<MainPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="sellerPersonalAccount" element={<SellerAccountPage />} />
          <Route path="supplierPersonalAccount" element={<SupplierAccountMainPage />} />
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
        <Route path="supplierPage" element={<SupplierPage/>} />
        <Route path="auth" element={<Auth />} />
        <Route path="forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="resetPassword" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
