import React, { useState, useEffect, useRef } from 'react';

import style from './ProductAbout.module.css';

const specification = {
  age_group: 'Adults',
  gender: 'Women',
  clothing_type: 'Dress',
  dresses_length: 'Mini',
  pattern_type: 'None',
  decoration: 'None',
  weaving_method: 'Knitted',
  technics: 'Printed',
  model_number: 'DD759',
  place_of_origin: 'Turkey, Istanbul',
};
const property = {
  material: 'Cotton 90%, Elastane 10%',
  style: 'Casual, Daily',
  season: 'Spring-Summer',
  description:
    'Dresses for women from COLORITE are quality, style and lightness in perfect execution. Our floral summer dresses model SHES are made of high quality viscose and polyester, which allows your skin to breathe, the dress is absolutely weightless. Festive evening dress with long sleeves has ruffles on the cuffs and a delicate elastic band for comfortable wear, the neckline is made with a square neckline, a...',
};
// const stage = {
//   supply_ability: '80000 Pieces per Month',
//   packaging: 'Separate package for item',
//   processing_time: '14 day',
//   delivery_time: 'Abra Shipping, ~15 days'
// }

// Response body
// Download
// {
//   "result": {
//   "variations": [],
//       "properties": [],
//       "description": "attending overhead drain cooler"
// }
// }
const ProductAbout = (): JSX.Element => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  const transformKey = (key: any) => {
    return key
      .split('_')
      .map((w: string | any[]) => w[0].toUpperCase() + w.slice(1))
      .join(' ');
  };

  useEffect(() => {
    if (targetRef.current) setHeight(targetRef.current.offsetHeight);
  }, [targetRef]);

  return (
    <div className={style.productAbout}>
      <h2>About the product</h2>
      <div className={style.productAbout__container}>
        <div className={style.productAbout__specifications}>
          {Object.entries(specification).map(d => (
            <div className={style.product__specifications} key={d[0]}>
              <div className={style.product__specifications_key}>
                {transformKey(d[0])}
              </div>
              <div className={style.product__specifications_value}>{d[1]}</div>
            </div>
          ))}
        </div>
        <div className={style.productAbout__property}>
          {Object.entries(property).map(d => (
            <div className={style.product__property} key={d[0]}>
              <div className={style.product__property_key}>{transformKey(d[0])}</div>
              <div className={style.product__property_value} ref={targetRef}>
                {d[1]}
              </div>
              <div
                className={
                  height > 115 && d[0] === 'description'
                    ? `${style.product__property_more}`
                    : 'none'
                }
              />
            </div>
          ))}
        </div>
        {/* <div className={style.productAbout__stage}> */}
        {/*  {Object.entries(stage).map((d) => ( */}
        {/*    <div className={style.product__stage} key={d[0]}> */}
        {/*      <div className={style.product__stage_key}> */}
        {/*        {transformKey(d[0])} */}
        {/*      </div> */}
        {/*      <div className={style.product__stage_value}>{d[1]}</div> */}
        {/*    </div> */}
        {/*  ))} */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProductAbout;
