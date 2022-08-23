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
  const activePage = useSelector((state) => state.paginate.activePage);   
  const amountItems = useSelector((state) => state.paginate.amountItems);  
  const categoryProduct = useSelector((state) => state.product.categoryProduct);
  const data = {page_num: activePage, page_size: amountItems, category: categoryProduct};
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
