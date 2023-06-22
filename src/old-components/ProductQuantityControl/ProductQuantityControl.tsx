import React, { FC, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { changeById } from '../../store/reducers/basketSlice';

import style from './ProductQuantityControl.module.scss';

const min = 100;

// TODO переделать и повесить логику
interface ProductQuantityControlProps {
  obj: any;
}
const ProductQuantityControl: FC<ProductQuantityControlProps> = ({
  obj,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  // const [value, setValue] = useState(obj.sum)
  const [value, setValue] = useState(min);
  const max = useAppSelector(state => state.product.max);

  const handlerInput = (): void => {
    const newObj = { ...obj };
    const a = Math.ceil(value / 100) * 100;

    if (a < 0) newObj.sum = 0;
    else if (a > max) newObj.sum = max;
    else newObj.sum = a;
    setValue(newObj.sum);
    dispatch(changeById({ newObj }));
  };

  const handlerQuantity = (a: number): void => {
    // const newObj = {...obj}
    // if (a <= 0) {
    //     newObj.sum -= 100
    //     newObj.sum = newObj.sum < 0 ? 0 : newObj.sum
    // }
    // if (a > 0) {
    //     newObj.sum += 100
    //     newObj.sum = newObj.sum > max ? max : newObj.sum
    // }
    // setValue(newObj.sum)
    // dispatch(changeById({ newObj }))

    if (a < 0 && value > min) setValue(prevState => prevState - 1);

    if (a > 0) setValue(prevState => prevState + 1);
  };

  return (
    <div className={style.product_quantity_control}>
      <div
        role="presentation"
        className={style.product_quantity_control_btn}
        onClick={() => handlerQuantity(-1)}
      >
        —
      </div>
      <input
        className={style.product_quantity_control_sum}
        type="number"
        // max={max}
        min={min}
        step={1}
        value={value}
        onChange={e => setValue(+e.target.value)}
        onBlur={handlerInput}
      />
      <div
        role="presentation"
        className={style.product_quantity_control_btn}
        onClick={() => handlerQuantity(1)}
      >
        +
      </div>
    </div>
  );
};

export default ProductQuantityControl;
