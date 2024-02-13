import React, { FC, JSX, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { useAppSelector, useOnClickOutside } from 'common/hooks';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { Button, Checkbox } from 'ui-kit';

import style from './CategoryDropdown.module.scss';

export const CategoryDropdown: FC = (): JSX.Element => {
  const categories = useAppSelector(state => state.common.categories);
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState<
    { id: number | null; name: string; parentId?: number | null }[]
  >([]);
  const refObj = useOnClickOutside(setIsActive, isActive);
  const handleCategory = (
    id: number | null,
    name: string,
    parentId: number | null,
  ): void => {
    const categories = selected.find(el => el.id === id);

    if (name === '') {
      setIsSelected(selected.filter(el => el.parentId !== parentId));
    } else if (categories && selected.includes(categories)) {
      setIsSelected(selected.filter(el => el.id !== id));
    } else setIsSelected([...selected, { id, name, parentId }]);
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
        {categories.map(el => (
          <List handleSelectedCategory={handleCategory} key={el.id} category={el} />
        ))}
      </div>
    </div>
  );
};
interface IList {
  category: ICategoryResponse;
  handleSelectedCategory: (
    id: number | null,
    name: string,
    parentId: number | null,
  ) => void;
}
const List: FC<IList> = ({ category, handleSelectedCategory }): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const isLastCategory = !category.children || category.children.length === 0;

  const handleCateg = (): void => {
    if (category.children && category.parent_id && isChecked) {
      handleSelectedCategory(null, '', category.id);
    }
    if (isLastCategory) {
      handleSelectedCategory(category.id, category.name, category.parent_id!);
    }
    setIsChecked(!isChecked);
  };

  return (
    <div className={style.item}>
      <div
        style={{ paddingLeft: category.parent_id ? '32px' : '0' }}
        className={style.sss}
      >
        {!isLastCategory ? (
          <ArrowIcon className={cn({ [style.arrow_up]: isChecked })} width="14" />
        ) : (
          <Checkbox
            className={cn(style.checkbox, {
              [style.last_checkbox]: isLastCategory,
            })}
            variant="default"
            checked={isChecked}
            onChange={handleCateg}
          />
        )}
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
