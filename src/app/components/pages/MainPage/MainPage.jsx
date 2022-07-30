import React from "react";
import "./MainPage.css";
import Slider from "../../common/Slider";
import Sort from "../../common/Sort";
import { InfoBtn } from "../../common/buttons";
import Feedback from "../../ui/feedback/Feedback";

const MainPage = () => {
  const dataArr = [
    "All categories",
    "Clothes and accessories",
    "Household products",
    "Cosmetics and self care",
  ];
  return (
    <>
      <div className="main-page">
        <Sort />
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
