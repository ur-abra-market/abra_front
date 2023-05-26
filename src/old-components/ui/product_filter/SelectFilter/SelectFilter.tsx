import { FC, useEffect, useState } from 'react';

import style from './SelectFilter.module.css';

import { ArrowDownIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { ascending, category, sort } from 'store/reducers/filterSlice';

interface SelectFilterProps {
  typeSelect: any;
}
const SelectFilter: FC<SelectFilterProps> = ({ typeSelect }): JSX.Element => {
  const dispatch = useAppDispatch();

  const listSort = [
    'Sort By Rating (From High to Low)',
    'Sort By Rating (From Low to High)',
    'Sort By Price (From High to Low)',
    'Sort By Price (From Low to High)',
  ];
  const typeSort = ['rating', 'rating', 'price', 'price'];
  const listCategory = ['All Categories', 'Clothes and Accessories'];
  const typeCategory = ['', '1'];

  const [listSwitch, setListSwitch] = useState(false);
  const [list, setList] = useState<any[]>([]);

  const choiceSort = useAppSelector(state => state.filter.sort_type);
  const choiceCategory = useAppSelector(state => state.filter.category);
  const choiceAscending = useAppSelector(state => state.filter.ascending);

  useEffect(() => {
    if (typeSelect === 'sort') setList(listSort);

    if (typeSelect === 'category') setList(listCategory);
  }, [listSort, listCategory, typeSelect]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const option = () => {
    if (typeSelect === 'sort') {
      if (choiceSort === 'rating') return !choiceAscending ? listSort[0] : listSort[1];

      if (choiceSort === 'price') return !choiceAscending ? listSort[2] : listSort[3];
    }
    if (typeSelect === 'category') {
      const index = typeCategory.findIndex(e => e === choiceCategory);

      return index < 0 ? listCategory[0] : listCategory[index];
    }
    setListSwitch(false);
  };

  const basic = option()?.split(/[()]/)[0];
  const remains = option()?.split(/[()]/)[1];

  const styleList = {
    height: listSwitch ? 'fit-content' : '0px',
  };

  const switchList = (e: any): void => {
    e.preventDefault();
    const nameClass = e.relatedTarget.className;

    if (!nameClass.includes('SelectFilter')) {
      setTimeout(() => {
        setListSwitch(false);
      }, 100);
    }
  };

  const handlerOption = (value: any, index: number): void => {
    if (listSort.includes(value)) dispatch(sort(typeSort[index]));
    if (listCategory.includes(value)) dispatch(category(typeCategory[index]));
    if (remains === 'From High to Low') dispatch(ascending(true));
    if (remains === 'From Low to High') dispatch(ascending(false));
  };

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div className={style.select_filter} onMouseOut={e => switchList(e)}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={style.select_filter_select}
        onClick={() => setListSwitch(!listSwitch)}
      >
        <div className={style.select_filter_text}>
          <div>{basic}</div>
          <div className={style.select_filter_text_remains}>
            {remains ? `(${remains})` : ''}
          </div>
        </div>
        <div className={style.select_filter_img}>
          <ArrowDownIcon />
        </div>
      </div>
      <ul className={style.select_filter_list} style={styleList}>
        {list.map((e, i) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
          <li
            className={style.select_filter_list_item}
            key={`option_${e}`}
            onClick={() => handlerOption(e, i)}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectFilter;
