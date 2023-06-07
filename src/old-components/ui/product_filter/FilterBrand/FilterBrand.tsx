import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import SearchFilter from '../SearchFilter';

import style from './FilterBrand.module.css';

import { brand } from 'store/reducers/filterSlice';

const FilterBrand = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector(state => state.filter.brands);
  const brandList: string[] = [
    'Mavi',
    'Kotton',
    'LC Waikiki',
    'Colin’s',
    'DeFacto',
    'Ipekyol',
  ];
  const len = brandList
    // @ts-ignore
    .map(b => brands.includes(b.toLowerCase()))
    .filter(e => !e);

  const changeState = (ctx: string): void => {
    const arrCheck = brandList
      // @ts-ignore
      .map(b => brands.includes(b.toLowerCase()))
      .map((e, i) => (brandList[i] === ctx ? !e : e));
    const brandArr = brandList.filter((_, i) => arrCheck[i]).map(b => b.toLowerCase());

    dispatch(brand(brandArr));
  };

  return (
    <div className={style.filter_brand}>
      <h4 className={style.filter_brand_title}>Brand</h4>
      <SearchFilter typeSearch="brand" />
      <div
        className={style.filter_brand_button}
        // @ts-ignore
        style={{ gap: len < brandList.length ? '24px' : '0px' }}
      >
        <div className={style.filter_brand_list}>
          {brandList
            // @ts-ignore
            .filter(b => brands.includes(b.toLowerCase()))
            .map(b => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                className={style.filter_brand_list_item && style.filter_item_active}
                style={{ background: '#000000', color: '#ffffff' }}
                onClick={() => changeState(b)}
                key={`brand_${b}`}
              >
                {b}
              </div>
            ))}
        </div>
        <div className={len ? style.filter_brand_list : 'none'}>
          {brandList
            // @ts-ignore
            .filter(b => !brands.includes(b.toLowerCase()))
            .map(b => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
              <div
                className={style.filter_brand_list_item}
                style={{ background: '#e5e5e5', color: '#000000' }}
                onClick={() => changeState(b)}
                key={`brand_${b}`}
              >
                {b}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBrand;
