import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import "./Slider.css";

const Slider = ({ title }) => {
  const n = 9;
  const widthCart = 220;
  const gap = 11;
  const step = widthCart + gap;
  const widthList = n * widthCart + (n - 1) * gap;
  const widthSlider = 1376;
  const dl = widthSlider - widthList;
  const dataArr = Array(n).fill("dataCard");
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
            <Link to="/product" key={`${data}-${index}`}>
              <Card />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
