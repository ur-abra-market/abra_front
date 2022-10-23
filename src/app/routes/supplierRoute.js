import AccountSetupPage from "../components/pages/accountSetupPage";
import BusinessProfilePage from "../components/pages/businessProfilePage";
import MainPage from "../components/pages/MainPage";
import ProductListRegistrationPage from "../components/pages/productListRegistrationPage";

const supplierRoute = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "account-setup",
    element: <AccountSetupPage />,
  },
  {
    path: "business-profile",
    element: <BusinessProfilePage />,
  },
  {
    path: "product-list-registration",
    element: <ProductListRegistrationPage />,
  },
];
export default supplierRoute;
