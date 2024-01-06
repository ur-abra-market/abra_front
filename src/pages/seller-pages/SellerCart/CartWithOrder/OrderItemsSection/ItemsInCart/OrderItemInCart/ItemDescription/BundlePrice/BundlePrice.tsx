import React, { FC } from 'react';

import { Paragraph } from 'ui-kit';

import style from './BundlePrice.module.scss';

export interface IBundlePrice {
  totalPriceBundle: number;
  priceValue: number;
}

export const BundlePrice: FC<IBundlePrice> = ({
  totalPriceBundle,
  priceValue,
}): JSX.Element => {
  return (
    <div className={style.item_price}>
      <Paragraph weight="semi_bold" className={style.total_price}>
        $ {totalPriceBundle}
      </Paragraph>
      <div className={style.item_price_details}>
        <Paragraph weight="medium" className={style.value_bundles}>
          {100} bundles
          {/* todo */}
        </Paragraph>
        <span className={style.line} />
        <div className={style.item_prices}>
          <Paragraph weight="medium" className={style.old_price}>
            ${priceValue}/{1} bnd
            {/* todo */}
          </Paragraph>
          {/* todo */}
          {/* <Paragraph weight="medium" className={style.new_price}> */}
          {/*  ${4.0}/{1}bnd */}
          {/* </Paragraph> */}
        </div>
      </div>
    </div>
  );
};
