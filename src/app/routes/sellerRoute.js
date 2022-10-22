import MainPage from "../components/pages/MainPage";
import ProductPage from "../components/pages/productPage";
import ProductListPage from "../components/pages/productListPage";
import UserAccountPage from "../components/pages/userAccountPage";
import OrderHistoryPage from "../components/pages/orderHistoryPage";
import OrderDetailsPage from "../components/pages/orderDetailsPage";

const sellerRoute = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "product",
    element: <ProductPage />,
  },
  {
    path: "productList",
    element: <ProductListPage />,
  },
  {
    path: "personalAccount",
    element: <UserAccountPage />,
  },
  {
    path: "orderHistory",
    element: <OrderHistoryPage />,
  },
  {
    path: "orderHistory/4784437395989684",
    element: <OrderDetailsPage />,
  },
  {
    path: "help",
    element: <p> Help </p>,
  },
];

export default sellerRoute;
