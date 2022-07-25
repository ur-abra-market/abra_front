import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import "./Main.css";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
