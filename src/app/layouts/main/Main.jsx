import Header from "../../components/common/Header/Header";
import MainPage from "../../components/pages/MainPage/MainPage";
import Footer from "../../components/common/Footer/Footer";
import Feedback from '../../components/common/Feedback/Feedback';
import './Main.css'

const Main = () => {
  return (
    <div className="container">
    <Header />
    <MainPage />      
    <Feedback />
    <Footer />
    </div>        
  );
};

export default Main;
