import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ArrowRightBreadCrumbs } from '../../../../assets/img';

import style from './ProductPath.module.css';

const ProductPath = ({ pathArr }) => {
  return (
    <div className={style.productPath}>
      {pathArr.map(route => (
        <Link key={`path_${route}`} className={style.productPath__item}>
          {route.replace('/', '')}
          <span>
            <ArrowRightBreadCrumbs />
          </span>
        </Link>
      ))}
    </div>
  );
};

ProductPath.propTypes = {
  pathArr: PropTypes.array.isRequired,
};

export default ProductPath;
