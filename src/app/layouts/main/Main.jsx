import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import "./Main.css";

const Main = () => {
  const statusPage = useSelector((state) => state.productPaginate.stateProduct);
  return (
    <div className="container">
      {statusPage === "loading" ? <Loader /> : <></>}
      <Outlet />
    </div>
  );
};

export default Main;
