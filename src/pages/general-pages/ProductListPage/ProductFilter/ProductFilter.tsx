import { FC } from 'react';

import { Brand } from './Brand/Brand';
import { Filters } from './Filters/Filters';
import { Material } from './Material/Material';
import { Price } from './Price/Price';

import { Button } from 'ui-kit';

import style from './ProductFilter.module.scss';

interface IProductFilter {
  onSaveQueryParams: () => void;
  onResetAllFilters: () => void;
}

export const ProductFilter: FC<IProductFilter> = ({
  onSaveQueryParams,
  onResetAllFilters,
}): JSX.Element => {
  return (
    <div className={style.product_filter}>
      <div className={style.filters_container}>
        <Filters onResetAllFilters={onResetAllFilters} />
        <Price />
        <Brand />
        <Material />
      </div>

      <Button onClick={onSaveQueryParams} className={style.button}>
        Apply
      </Button>
    </div>
  );
};
