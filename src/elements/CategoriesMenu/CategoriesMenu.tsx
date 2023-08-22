import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useState,
  DetailedHTMLProps,
  HTMLAttributes,
  KeyboardEvent,
  useRef,
} from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import style from './CategoriesMenu.module.scss';

import { FilterButton, MenuItems } from '.';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { PRODUCTS_LIST } from 'routes';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { getAllCategories } from 'store/reducers/commonSlice';

// todo need discus about this type
// export type Categories = 'Clothes' | 'Accessories' | 'Cosmetics and Self Care';

export interface CategoriesMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClose: (isOpen: boolean) => void;
}

const VALUE_OUTSIDE_LIST = -1;
const STEP = 1;

export const CategoriesMenu = forwardRef(
  ({ onClose }: CategoriesMenuProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [indexActiveParentCategory, setIndexActiveParentCategory] = useState(0);
    const [indexActiveChildrenColumn, setIndexActiveChildrenColumn] =
      useState(VALUE_OUTSIDE_LIST);
    const [indexActiveChildrenRow, setIndexActiveChildrenRow] =
      useState(VALUE_OUTSIDE_LIST);
    const [isChildrenSelected, setIsChildrenSelected] = useState(false);
    const menuRef = useRef<HTMLUListElement | null>(null);
    const categories = useAppSelector(state => state.common.categories);
    const wearerCategory = categories ? categories.filter(c => c.level === 1) : [];
    const categoriesMenu = [
      { id: 12, name: 'All categories', level: 0, children: [] },
      ...wearerCategory,
    ];

    const maxLengthDepthChildren =
      categoriesMenu[indexActiveParentCategory]?.children?.[indexActiveChildrenColumn]
        ?.children?.length ?? null;

    const filterCategories = (
      category?: ICategoryResponse[],
    ): ICategoryResponse[] | [] => {
      return category
        ? category.filter(c => {
            return c.name;
          })
        : [];
    };

    useEffect(() => {
      if (menuRef.current) {
        menuRef.current.focus();
      }
    }, []);

    useEffect(() => {
      if (!categories) {
        dispatch(getAllCategories());
      }
    }, [dispatch, categories]);

    useEffect(() => {
      if (indexActiveChildrenColumn < 0) {
        setIsChildrenSelected(false);
        setIndexActiveChildrenRow(VALUE_OUTSIDE_LIST);
        setIndexActiveChildrenColumn(VALUE_OUTSIDE_LIST);
      }
      if (
        maxLengthDepthChildren !== null &&
        maxLengthDepthChildren <= indexActiveChildrenRow
      ) {
        setIndexActiveChildrenRow(maxLengthDepthChildren - 1);
      }
    }, [indexActiveChildrenColumn, indexActiveChildrenRow, maxLengthDepthChildren]);

    const maxIndexChildren = (parent: ICategoryResponse): number =>
      parent.children ? parent.children.length - 1 : 0;

    const handleGeneralMenuKeyboard = (event: KeyboardEvent): void => {
      const { code } = event;

      event.preventDefault();

      if (isChildrenSelected) {
        handleChildrenMenuKeyboard(event);

        return;
      }

      if (code === 'Escape') {
        onClose(false);
      } else if (
        code === 'ArrowDown' &&
        indexActiveParentCategory < categoriesMenu.length - 1
      ) {
        setIndexActiveParentCategory(prevState => prevState + STEP);
      } else if (code === 'ArrowUp' && indexActiveParentCategory > 0) {
        setIndexActiveParentCategory(prevState => prevState - STEP);
      } else if (code === 'ArrowRight') {
        setIsChildrenSelected(true);
        setIndexActiveChildrenColumn(prevState => prevState + STEP);
      }
    };

    const handleChildrenMenuKeyboard = (event: KeyboardEvent): void => {
      const { code } = event;
      const activeCategory = categoriesMenu[indexActiveParentCategory];
      const maxChildrenIndex = maxIndexChildren(activeCategory);
      const pageId = activeCategory.children?.[indexActiveChildrenColumn].id;

      if (code === 'ArrowRight' && indexActiveChildrenColumn < maxChildrenIndex) {
        setIndexActiveChildrenColumn(prevState => prevState + STEP);
      }

      if (code === 'ArrowLeft') {
        setIndexActiveChildrenColumn(prevState => prevState - STEP);
      }

      if (code === 'ArrowUp' && indexActiveChildrenRow > VALUE_OUTSIDE_LIST) {
        setIndexActiveChildrenRow(prevState => prevState - STEP);
      }

      if (
        code === 'ArrowDown' &&
        maxLengthDepthChildren !== null &&
        maxLengthDepthChildren - 1 > indexActiveChildrenRow
      ) {
        setIndexActiveChildrenRow(prevState => prevState + STEP);
      }
      if (code === 'Enter' && pageId) {
        navigate(`${PRODUCTS_LIST}/${pageId}`);
      }
    };

    return (
      <div ref={ref} className={cn(style.menu_container)}>
        <ul
          className={style.list}
          ref={menuRef}
          role="listbox"
          tabIndex={0}
          onKeyDown={event => handleGeneralMenuKeyboard(event)}
        >
          {categoriesMenu.map((c, index) => {
            return (
              <FilterButton
                key={c.id}
                value={index}
                activeValue={indexActiveParentCategory}
                callback={setIndexActiveParentCategory}
              >
                {c.name}
              </FilterButton>
            );
          })}
        </ul>

        {wearerCategory
          ?.filter(c => c.name === categoriesMenu[indexActiveParentCategory].name)
          .map(c => {
            const items = filterCategories(c.children);
            const column = items[indexActiveChildrenColumn]?.children;
            const row = column?.[indexActiveChildrenRow];
            const activeParentId = items[indexActiveChildrenColumn]?.id;

            return (
              <MenuItems
                key={c.id}
                items={items}
                activeParentId={activeParentId}
                focusedItem={row ? row.name : ''}
                indexActiveRow={indexActiveChildrenRow}
                focusedItemParent={items[indexActiveChildrenColumn]?.name || ''}
              />
            );
          })}
      </div>
    );
  },
);
