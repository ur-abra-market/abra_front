import React from 'react'
import style from './ProductPath.module.css'
import PropTypes from 'prop-types'

const ProductPath = ({pathArr}) => {
  return (
    <div className={style.productPath}>
      {pathArr.map((route) => (
        <p key={`path_${route}`}>{route}</p>
      ))}
    </div>
  )
}

ProductPath.propTypes = {
  pathArr: PropTypes.array.isRequired
}

export default ProductPath
