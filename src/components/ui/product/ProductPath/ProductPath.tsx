import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { ArrowRightBreadCrumbs } from '../../../../assets/img';

import style from './ProductPath.module.css';

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
            <ArrowRightBreadCrumbs />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ProductPath;
