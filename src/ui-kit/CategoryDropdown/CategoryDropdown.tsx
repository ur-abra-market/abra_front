import React, { FC, JSX, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { useOnClickOutside } from 'common/hooks';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { Button, Checkbox } from 'ui-kit';

import style from './CategoryDropdown.module.scss';

interface ICategoryDropDown {
  category: ICategoryResponse[];
}

export const CategoryDropdown: FC<ICategoryDropDown> = ({ category }): JSX.Element => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState<
    { id: number | null; name: string; parent?: boolean }[]
  >([]);
  const refObj = useOnClickOutside(setIsActive, isActive);
  const handleCategory = (id: number | null, name: string): void => {
    const category = selected.find(el => el.id === id);

    if (category && selected.includes(category)) {
      setIsSelected(selected.filter(el => el.id !== id));
    } else setIsSelected([...selected, { id, name }]);
  };

  return (
    <div className={style.dropdown}>
      <Button
        color="white"
        className={style.dropdown_btn}
        onClick={e => {
          setIsActive(!isActive);
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className={style.filter_name}>{`${
            selected.length === 0 ? 'All' : selected.map(el => el.name)
          }${selected.length - 1 === selected.length ? ', ' : ''} `}</span>
          <ArrowIcon
            style={{ minWidth: '14px' }}
            className={cn({ [style.arrow_up]: isActive })}
            width="14"
          />
        </div>
      </Button>
      <div
        ref={refObj}
        className={style.dropdown_content}
        style={{ display: isActive ? 'block' : 'none' }}
      >
        {category.map(el => (
          <List handleSelectedCategory={handleCategory} key={el.id} category={el} />
        ))}
      </div>
    </div>
  );
};
interface IList {
  category: ICategoryResponse;
  handleSelectedCategory: (id: number | null, name: string) => void;
}
const List: FC<IList> = ({ category, handleSelectedCategory }): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const isLastCategory = !category.children || category.children.length === 0;

  const handleCateg = (): void => {
    if (isLastCategory) handleSelectedCategory(category.id, category.name);
    setIsChecked(!isChecked);
  };

  console.log(isLastCategory);

  return (
    <div className={style.item}>
      <div
        style={{ paddingLeft: category.parent_id ? '32px' : '0' }}
        className={style.sss}
      >
        {!isLastCategory && (
          <ArrowIcon className={cn({ [style.arrow_up]: isChecked })} width="14" />
        )}
        <Checkbox
          className={cn(style.checkbox, {
            [style.last_checkbox]: isLastCategory,
          })}
          variant="default"
          checked={isChecked}
          onChange={handleCateg}
        />
        <div
          className={style.titles}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={handleCateg}
        >
          {category.name}
        </div>
      </div>

      {!isLastCategory &&
        isChecked &&
        category.children?.map(el => (
          <List
            handleSelectedCategory={handleSelectedCategory}
            key={el.id}
            category={el}
          />
        ))}
    </div>
  );
};
