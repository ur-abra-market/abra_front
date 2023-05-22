import React, { FC, useState } from 'react';

import style from './ProductStatistics.module.css';
import { ProductStatisticsProps } from './ProductStatistics.props';
import { SizeItem } from './Sizes/SizeItem';

const getIsSelectedSize = ({ size, selectedSizes }: any): boolean => {
  return selectedSizes.some((el: any) => el === size);
};

const ProductStatistics: FC<ProductStatisticsProps> = ({
  dailyActualDemand,
  monthlyActualDemand,
  sizes,
}) => {
  // const {min_quantity, value} = prices

  // const unitPrice = (prices?.value / prices?.min_quantity).toFixed(2);

  const [selectedSizes, setSelectedSizes] = useState<any[]>([]);

  const addOrRemoveSize = (size: any): void => {
    if (getIsSelectedSize({ size, selectedSizes }))
      setSelectedSizes(prevState => prevState.filter(item => item !== size));
    else setSelectedSizes(prevState => [...prevState, size]);
  };

  return (
    <div className={style.statistics}>
      <div className={style.sizes}>
        <div className={style.sizes_title}>Select size</div>
        {sizes &&
          sizes?.map((size, index) => (
            <SizeItem
              key={index}
              label={size}
              isSelected={getIsSelectedSize({ size, selectedSizes })}
              onClick={addOrRemoveSize}
            />
          ))}
      </div>
      <div className={style.statistics_basic}>
        <div className={style.statistics_demend}>
          <div className={style.statistics_demend_parameter}>Actual demand</div>
          <div className={style.statistics_demend_value}>
            <span>{monthlyActualDemand}</span>pc/mo
          </div>
          <div className={style.statistics_demend_note}>
            *Average number for a monthly period
          </div>
        </div>
        <div className={style.statistics_demend}>
          <div className={style.statistics_demend_parameter}>Sold per day</div>
          <div className={style.statistics_demend_value}>
            <span>{dailyActualDemand}</span> pc
          </div>
          <div className={style.statistics_demend_note}>*Average sales per day</div>
        </div>
      </div>
      {/* <div className={style.statistics_price}> */}
      {/* <div className={style.statistics_price_change}>Price changes</div> */}
      {/* <div className={style.statistics_price_range}>from $8.50 up to $9.99</div> */}
      {/* </div> */}
      {/* <ProductCanvas /> */}
      {/* <div className={style.statistics_condition}> */}
      {/* <div>Special offer: ≥ <span>{min_quantity}</span> = 1pc/$<span>{unitPrice}</span></div> */}
      {/* <div>Processing time: 14 day</div> */}
      {/* <div>Estimated delivery: 27.07.2022</div> */}
      {/* </div> */}
    </div>
  );
};

export default ProductStatistics;
