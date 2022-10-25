import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loader from "../../components/common/Loader";
import "./Main.css";

const Main = () => {
  const statusPage = useSelector((state) => state.productPaginate.stateProduct);
  const profile = localStorage.getItem("profile");
  useEffect(() => {}, [profile]);
  return (
    <div className="container">
      {statusPage === "loading" ? <Loader /> : <></>}
      <Outlet />
    </div>
  );
};

export default Main;
