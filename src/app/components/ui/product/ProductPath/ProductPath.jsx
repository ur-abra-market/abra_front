import React from 'react'
import style from './ProductPath.module.css'
const pathArr = ['Clothes for women', 'Dress', 'Spring-Summer']
const ProductPath = () => {
  return (
    <div className={style.productPath}>
      {pathArr.map((route) => (
        <p key={`path_${route}`}>{route}</p>
      ))}
    </div>
  )
}

export default ProductPath
