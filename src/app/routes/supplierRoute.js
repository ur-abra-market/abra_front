import SupplierPage from "../components/pages/supplierPage";
import SupplierAccountPage from "../components/pages/supplierAccountMainPage";
import DashboardPage from "../components/pages/dashboardPage";
import ProductsListPage from "../components/pages/productsListPage";
import OrdersPage from "../components/pages/ordersPage";
import PriceManagementPage from "../components/pages/priceManagementPage";
import AnalyticsPage from "../components/pages/analyticsPage";
import FeedbackAndQuestionsPage from "../components/pages/feedbackAndQuestionsPage/feedbackAndQuestionsPage";
import AccountSetupPage from "../components/pages/accountSetupPage";
import BusinessProfilePage from "../components/pages/businessProfilePage";
import ProductListRegistrationPage from "../components/pages/productListRegistrationPage";

const supplierRoute = [
  {
    path: "/",
    element: <SupplierPage />,
    children: [
      {
        path: "/",
        element: <SupplierAccountPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "products-list",
        element: <ProductsListPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "price",
        element: <PriceManagementPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "feedback",
        element: <FeedbackAndQuestionsPage />,
      },
    ],
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
