import React, { useState, useEffect } from "react";
import "./ProductPhoto.css";

const baseurl = "./assets/image/products";
const photoAll = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
];

const ProductPhoto = () => {
  const step = 114;

  const [len, setLen] = useState(0);
  const [count, SetCount] = useState(0);
  const [height, SetHeight] = useState(step * 5 - 8);
  const [top, SetTop] = useState(-step);
  const [transition, SetTransition] = useState("0.5s");

  const slides = [photoAll[len - 1], ...photoAll, photoAll[0]];
  const slidesHalf1 = slides.slice(len - count, len + 1);
  const slidesHalf2 = slides.slice(1, len + 1);

  useEffect(() => {
    setLen(photoAll.length);
    const amountSlide = photoAll.length < 6 ? photoAll.length - 1 : 5;
    SetHeight(amountSlide * step - 8);
  }, []);

  const moveDown = () => {
    SetTransition("0.5s");
    SetTop(-(2 * step));
  };

  const moveUp = () => {
    SetTransition("0.5s");
    SetTop(0);
  };

  const change = () => {
    SetTransition("none");
    if (top === 0) SetCount(count === len - 1 ? 0 : count + 1);
    if (top < -step) SetCount(count === 0 ? len - 1 : count - 1);
    SetTop(-step);
  };

  return (
    <div className="ProductPhoto">
      <div className="Photo__slider">
        <div className="Photo__slider_btn-up" onClick={moveUp} />
        <div className="Photo__slider_slides" style={{ height }}>
          <div
            className="Photo__slider_list"
            style={{ top, transition }}
            onTransitionEnd={change}
          >
            {slidesHalf1.map((p, index) => (
              <img
                className="Photo__slider_slide"
                key={`${p}-${index}`}
                src={`${baseurl}/${p}`}
                alt="ptoduct"
              />
            ))}
            {slidesHalf2.map((p, index) => (
              <img
                className="Photo__slider_slide"
                key={`${p}-${index}`}
                src={`${baseurl}/${p}`}
                alt="ptoduct"
              />
            ))}
          </div>
        </div>
        <div className="Photo__slider_btn-down" onClick={moveDown} />
      </div>
      <div className="Photo__image">
        <img src={`${baseurl}/${slides[len + 1 - count]}`} alt="ptoduct" />
      </div>
    </div>
  );
};

export default ProductPhoto;
