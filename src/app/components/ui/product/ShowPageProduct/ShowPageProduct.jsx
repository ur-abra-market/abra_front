import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sizePage, activeNum } from "../../../../store/reducers/productPaginateSlice";
import arrowDown from "../../../../assets/img/icons/arrow-slide-down.svg";
import "./ShowPageProduct.css";

const ShowPageProduct = () => {
  const dispatch = useDispatch();
  const list = ["20", "40", "60", "80", "100"];
  const [option, setOption] = useState(list[0]);
  const [listSwitch, setListSwitch] = useState(false);
  const styleList = {
    height: listSwitch ? "fit-content" : "0px",
  };

  const switchList = (e) => {
    e.preventDefault();
    const nameClass = e.relatedTarget.className;
    if (!nameClass.includes("ShowPageProduct")) {
      setTimeout(() => {
        setListSwitch(false);
      }, 100);
    }
  };

  return (
    <div className='ShowPageProduct' onMouseOut={(e) => switchList(e)}>
      <div className='ShowPageProduct__select'>
        <div className='ShowPageProduct_text'>{`Show by ${option}`}</div>
        <div
          className='ShowPageProduct_img'
          onClick={() => setListSwitch(!listSwitch)}
        >
          <img src={arrowDown} alt="arrow-down" />
        </div>
      </div>
      <ul className='ShowPageProduct__list' style={styleList}>
        {list.map((e, i) => (
          <li
            className='ShowPageProduct__list_item'
            key={`option_${e}`}
            onClick={() => {
              setOption(e);
              setListSwitch(!listSwitch);
              dispatch(sizePage(+e));
              dispatch(activeNum(1));
            }}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPageProduct;
