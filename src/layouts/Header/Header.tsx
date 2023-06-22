import React, {
  FC,
  RefObject,
  useEffect,
  useRef,
  useState,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';

import cn from 'classnames';

import { CategoriesMenu } from '../../components/CategoriesMenu/CategoriesMenu';
import { LocationAndCurrencySelection } from '../../components/LocationAndCurrencySelection/LocationAndCurrencySelection';
import HeaderNavMenu from '../../old-components/HeaderNavMemu';
import { Container } from '../../ui-kit';

import style from './Header.module.scss';
import Top from './Top/Top';

export interface IHeader
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Header: FC<IHeader> = ({ className, ...restProps }): JSX.Element => {
  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);

  const categoriesRef = useRef() as RefObject<HTMLDivElement>;
  const buttonRef = useRef() as RefObject<HTMLButtonElement>;

  useEffect(() => {
    const handler = (e: Event): void => {
      const target = e.target as Element;

      if (
        categoriesRef.current &&
        categoriesIsOpen &&
        target !== buttonRef.current &&
        !categoriesRef.current.contains(target)
      ) {
        setCategoriesIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <header className={cn(className)} {...restProps}>
      <Container className={style.container_position}>
        <Top />
        <div className={style.wrapper}>
          <button
            type="button"
            ref={buttonRef}
            className={style.left}
            onClick={() => setCategoriesIsOpen(!categoriesIsOpen)}
          >
            All categories
          </button>
          <HeaderNavMenu className={style.center} />
          <LocationAndCurrencySelection className={style.right} />
        </div>
        {categoriesIsOpen && <CategoriesMenu ref={categoriesRef} />}
      </Container>
    </header>
  );
};

export default Header;
