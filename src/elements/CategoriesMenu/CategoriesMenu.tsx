import {
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

import { FilterButton, MenuItems } from '.';

import { KEYBOARD_KEYS } from 'common/constants/index';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { PRODUCTS_LIST } from 'routes';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { getAllCategories } from 'store/reducers/commonSlice';

import style from './CategoriesMenu.module.scss';

export interface CategoriesMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClose: (isOpen: boolean) => void;
  handleFocus: () => void;
}

const VALUE_OUTSIDE_LIST = -1;
const STEP = 1;

export const CategoriesMenu = forwardRef(
  (
    { onClose, handleFocus }: CategoriesMenuProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
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
      { id: 0, name: 'All categories', level: 0, children: [] },
      ...wearerCategory,
    ];
    const menuDepth =
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
      if (menuDepth !== null && menuDepth <= indexActiveChildrenRow) {
        setIndexActiveChildrenRow(menuDepth - 1);
      }
    }, [indexActiveChildrenColumn, indexActiveChildrenRow, menuDepth]);

    const maxIndexChild = (parent: ICategoryResponse): number =>
      parent.children ? parent.children.length - 1 : 0;

    const handleKeyDown = (event: KeyboardEvent): void => {
      const keyCode = event.code;
      const category = categoriesMenu[indexActiveParentCategory];
      const maxIndex = maxIndexChild(category);
      const categoryId = category.children?.[indexActiveChildrenColumn]?.id;

      event.preventDefault();

      if (isChildrenSelected) {
        if (
          keyCode === KEYBOARD_KEYS.ARROW_RIGHT &&
          indexActiveChildrenColumn < maxIndex
        ) {
          setIndexActiveChildrenColumn(prevState => prevState + STEP);
        }

        if (keyCode === KEYBOARD_KEYS.ARROW_LEFT) {
          setIndexActiveChildrenColumn(prevState => prevState - STEP);
        }

        if (
          keyCode === KEYBOARD_KEYS.ARROW_UP &&
          indexActiveChildrenRow > VALUE_OUTSIDE_LIST
        ) {
          setIndexActiveChildrenRow(prevState => prevState - STEP);
        }

        if (
          keyCode === KEYBOARD_KEYS.ARROW_DOWN &&
          menuDepth !== null &&
          menuDepth - 1 > indexActiveChildrenRow
        ) {
          setIndexActiveChildrenRow(prevState => prevState + STEP);
        }
        if (keyCode === KEYBOARD_KEYS.ENTER && categoryId) {
          navigate(`${PRODUCTS_LIST}/${categoryId}`);
        }
      } else if (keyCode === KEYBOARD_KEYS.ESCAPE) {
        handleFocus();
        onClose(false);
      } else if (
        keyCode === KEYBOARD_KEYS.ARROW_DOWN &&
        indexActiveParentCategory < categoriesMenu.length - 1
      ) {
        setIndexActiveParentCategory(prevState => prevState + STEP);
      } else if (keyCode === KEYBOARD_KEYS.ARROW_UP && indexActiveParentCategory > 0) {
        setIndexActiveParentCategory(prevState => prevState - STEP);
      } else if (
        keyCode === KEYBOARD_KEYS.ARROW_RIGHT &&
        categoriesMenu[indexActiveParentCategory].id !== 0
      ) {
        setIsChildrenSelected(true);
        setIndexActiveChildrenColumn(prevState => prevState + STEP);
      }
    };

    return (
      <div ref={ref} className={cn(style.menu_container)}>
        <ul
          className={style.list}
          ref={menuRef}
          role="listbox"
          tabIndex={0}
          onKeyDown={handleKeyDown}
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
                selectedCategory={row ? row.name : ''}
                indexActiveRow={indexActiveChildrenRow}
                selectedCategoryItem={items[indexActiveChildrenColumn]?.name || ''}
              />
            );
          })}
      </div>
    );
  },
);
