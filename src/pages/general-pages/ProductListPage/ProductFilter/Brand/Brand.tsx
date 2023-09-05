import style from './Brand.module.scss';

import { Search } from 'ui-kit';

export const Brand = (): JSX.Element => {
  return (
    <div className={style.brand}>
      <p className={style.title}>Brand</p>
      <Search placeholder="Search" />
    </div>
  );
};
