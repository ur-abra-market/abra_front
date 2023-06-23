import { FC } from 'react';

import { Link } from 'react-router-dom';

import style from './ProductPath.module.scss';

import { BreadcrumbsArrowIcon } from 'assets/icons';

interface ProductPathProps {
  pathArr: string[];
}
// TODO - to - обязательеный параметр
const ProductPath: FC<ProductPathProps> = ({ pathArr }): JSX.Element => {
  return (
    <div className={style.product_path}>
      {pathArr.map(route => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link key={`path_${route}`} className={style.product_path_item} to="#">
          {route.replace('/', '')}
          <span>
            <BreadcrumbsArrowIcon />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ProductPath;
