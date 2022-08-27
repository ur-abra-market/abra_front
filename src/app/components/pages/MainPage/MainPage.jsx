import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { productPaginateService } from '../../../store/reducers/productPaginateSlice';
import "./MainPage.css";
import Slider from "../../common/Slider";
import StatusProduct from "../../common/StatusProduct";
import { InfoBtn } from "../../common/buttons";
import Feedback from "../../ui/feedback/Feedback";

const MainPage = () => {
  const dispatch = useDispatch();
  const paginate = useSelector((state) => state.paginate);     
  const filter = useSelector((state) => state.filter);
  const data = {...filter, ...paginate}; 
  dispatch(productPaginateService(data));

  const dataArr = [
    "All categories",
    "Clothes and accessories",
    "Household products",
    "Cosmetics and self care",
  ];
  return (
    <>
      <div className="main-page">
        <StatusProduct />
        <div className="Main__sliders">
          {dataArr.map((data, index) => (
            <Slider key={`name-1-${index}`} title={data} />
          ))}
        </div>
        <InfoBtn />
      </div>
      <Feedback />
    </>
  );
};

export default MainPage;
