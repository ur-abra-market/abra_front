import React, { useState } from 'react';

import style from './FilterSizes.module.css';

const FilterSizes = () => {
  const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'];
  const sizeCheck = sizeList.map(() => false);

  const [check, setCheck] = useState(sizeCheck);

  const changeState = index => {
    const arrCheck = check.map((e, i) => (i === index ? !e : e));

    setCheck(arrCheck);
  };

  return (
    <div className={style.filterSizes}>
      <h4>Sizes</h4>
      <div className={style.filterSizes__list}>
        {sizeList.map((s, i) => (
          <div
            className={style.filterSizes__list_item}
            style={{
              background: check[i] ? '#000000' : '#ffffff',
              color: check[i] ? '#ffffff' : '#000000',
            }}
            onClick={() => changeState(i)}
            key={`size_${s}`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSizes;
