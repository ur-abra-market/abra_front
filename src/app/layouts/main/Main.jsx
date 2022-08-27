import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import "./Main.css";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loader from "../../components/common/Loader";

const Main = () => {
  const statusPage = useSelector((state) => state.productPaginate.stateProduct);  
  return (
    <div className="container">
      <Header />
      {statusPage === 'loading' ? <Loader /> : <></>}      
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
