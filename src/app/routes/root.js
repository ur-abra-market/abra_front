import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/auth";
import Main from "../layouts/main";
import ConfirmEmailPage from "../components/pages/confirmEmailPage";
import ForgotPasswordPage from "../components/pages/forgotPasswordPage";
import ResetPasswordPage from "../components/pages/resetPasswordPage";
import supplierRoute from "./supplierRoute";
import sellerRoute from "./sellerRoute";

const profile = localStorage.getItem("profile");

const child = profile ? supplierRoute : sellerRoute;

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: (
      <main style={{ padding: "1rem" }}>
        <p>There's nothing here!</p>
      </main>
    ),
    children: [...child],
  },
  {
    path: "auth",
    element: <Auth />,
  },
  {
    path: "forgotPassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "resetPassword",
    element: <ResetPasswordPage />,
  },
  {
    path: "register/email-confirmation",
    element: <ConfirmEmailPage />,
  },
]);

export default routes;
