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
          {/* todo add amount bundle and how will be count this bundle */}
        </Paragraph>
        <span className={style.line} />
        <div className={style.item_prices}>
          <Paragraph weight="medium" className={style.price}>
            ${priceValue}/{1} bnd
            {/* todo add amount bundle with discount price depending on
             amount all bundle
              */}
          </Paragraph>
          {/* todo discount information  */}
          {/* <Paragraph weight="medium" className={style.price_with_discount}> */}
          {/*  ${4.0}/{1}bnd */}
          {/* </Paragraph> */}
        </div>
      </div>
    </div>
  );
};
