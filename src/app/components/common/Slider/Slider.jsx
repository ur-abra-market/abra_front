import React, { useState } from "react";
import { useSelector } from 'react-redux';
import Card from "../Card";
import "./Slider.css";

const Slider = ({ title }) => {
  const dataArr = useSelector((state) => state.productPaginate.dataProductPaginate);  
  const widthCart = 220;
  const gap = 11;
  const step = widthCart + gap;
  const widthList = dataArr.length * widthCart + (dataArr.length - 1) * gap;
  const widthSlider = 1376;
  const dl = widthSlider - widthList;  
  const [left, setLeft] = useState(0);  

  const move = (d) => {
    const newleft = left + d;
    const dLeft = newleft > 0 ? 0 : newleft < dl ? dl : newleft;
    setLeft(dLeft);
  };

  return (
    <div className="Slider">
      <div className="Slider__control">
        <div className="Slider__name">
          <h2>{title}</h2>
          <span>See all</span>
        </div>
        <div className="Slider__btn">
          <div className="Slider__btn_left" onClick={() => move(step)}></div>
          <div className="Slider__btn_right" onClick={() => move(-step)}></div>
        </div>
      </div>
      <div className="Slider__card">
        <div className="Slider__card_list" style={{ left: `${left}px` }}>
          {dataArr.map((data, index) => (
           <Card key={`card_${index}`} props={data} />            
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
