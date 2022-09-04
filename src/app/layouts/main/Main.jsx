import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import Loader from "../../components/common/Loader";
import "./Main.css";

const Main = () => {
  const statusPage = useSelector((state) => state.productPaginate.stateProduct);
  return (
    <div className="container">
      <Header />
      {statusPage === "loading" ? <Loader /> : <></>}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
