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
    <div className={style.productPath}>
      {pathArr.map(route => (
        <Link key={`path_${route}`} className={style.productPath__item} to="#">
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
