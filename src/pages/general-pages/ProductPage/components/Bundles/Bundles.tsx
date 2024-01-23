import React, { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import { scrollBundleContainer } from './helper/scrollBundleContainer';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { pickableVariationType } from 'pages/general-pages/ProductPage/helpers/pickableVariationType';
import { setActiveBundle } from 'store/reducers/productSlice/slice';
import { Paragraph } from 'ui-kit';
import { ButtonBundle } from 'ui-kit/buttons/ButtonBundle/ButtonBundle';

import style from './Bundles.module.scss';

export const Bundles = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const scrollWidthContainerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const productBundles = useAppSelector(state => state.product.productCard.bundles);
  const isBundle = productBundles[active].variation_values.length > 0;

  const handleChangeActiveBundle = (index: number): void => {
    setActive(index);
    if (isBundle) {
      dispatch(setActiveBundle(pickableVariationType(productBundles[active])));
    }
  };

  useEffect(() => {
    if (isBundle) {
      dispatch(setActiveBundle(pickableVariationType(productBundles[active])));
    }
  }, []);

  return (
    <div className={style.bundle_wrapper}>
      {productBundles.length > 4 && (
        <ArrowIcon
          className={style.left_arrow}
          onClick={() => scrollBundleContainer('left', scrollWidthContainerRef)}
        />
      )}
      <div ref={scrollWidthContainerRef} className={style.bundle_container}>
        <div className={style.bundles}>
          {isBundle ? (
            productBundles.map((el, i) => (
              <ButtonBundle
                key={i}
                onClick={() => handleChangeActiveBundle(i)}
                className={cn(style.item, { [style.active]: i === active })}
              >
                {/* todo исправить когда бек начнет присылать имя бандла */}
                Bundle
              </ButtonBundle>
            ))
          ) : (
            <Paragraph size="m" weight="medium">
              Bundles not found
            </Paragraph>
          )}
        </div>
      </div>
      {productBundles.length > 4 && (
        <ArrowIcon
          className={style.right_arrow}
          onClick={() => scrollBundleContainer('right', scrollWidthContainerRef)}
        />
      )}
    </div>
  );
};
