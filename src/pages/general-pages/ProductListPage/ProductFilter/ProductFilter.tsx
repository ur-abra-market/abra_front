import { Brand } from './Brand/Brand';
import { Filters } from './Filters/Filters';
import { Material } from './Material/Material';
import { Price } from './Price/Price';
import style from './ProductFilter.module.scss';

export const ProductFilter = (): JSX.Element => {
  return (
    <div className={style.product_filter}>
      <Filters />
      <Price />
      <Brand />
      <Material />
    </div>
  );
};
