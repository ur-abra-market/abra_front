import React from 'react'
import style from './ProductPath.module.css'
import PropTypes from 'prop-types'
import {ArrowRightBreadCrumbs} from '../../../../assets/img'
import {Link} from 'react-router-dom'

const ProductPath = ({pathArr}) => {
  return (
    <div className={style.productPath}>
      {pathArr.map((route) => (
        <Link key={`path_${route}`} className={style.productPath__item}>
          {route.replace('/', '')}
          <span><ArrowRightBreadCrumbs/></span>
        </Link>
      ))}
    </div>
  )
}

ProductPath.propTypes = {
  pathArr: PropTypes.array.isRequired
}

export default ProductPath
