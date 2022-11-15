import React, { useState } from 'react'
import SearchFilter from '../SearchFilter'
import style from './FilterBrand.module.css'

const FilterBrand = () => {
  const brandList = [
    'Mavi',
    'Kotton',
    'LC Waikiki',
    'Colin’s',
    'DeFacto',
    'Ipekyol'
  ]
  const brandCheck = brandList.map(() => false)
  const [check, setCheck] = useState(brandCheck)
  const [len, setLen] = useState(brandCheck.length)

  const changeState = (ctx) => {
    const arrCheck = check.map((e, i) => (brandList[i] === ctx ? !e : e))
    setLen(arrCheck.filter((e) => !e).length)
    setCheck(arrCheck)
  }

  return (
    <div className={style.filterBrand}>
      <h4 className={style.filterBrand__title}>Brand</h4>
      <SearchFilter />
      <div
        className={style.filterBrand__btns}
        style={{ gap: len < check.length ? '24px' : '0px' }}
      >
        <div className={style.filterBrand__list}>
          {brandList
            .filter((b, i) => check[i])
            .map((b) => (
              <div
                className={
                  style.filterBrand__list_item + style.filter_item_active
                }
                style={{ background: '#000000', color: '#ffffff' }}
                onClick={() => changeState(b)}
                key={`brand_${b}`}
              >
                {b}
              </div>
            ))}
        </div>
        <div className={len ? `${style.filterBrand__list}` : 'none'}>
          {brandList
            .filter((b, i) => !check[i])
            .map((b) => (
              <div
                className={style.filterBrand__list_item}
                style={{ background: '#e5e5e5', color: '#000000' }}
                onClick={() => changeState(b)}
                key={`brand_${b}`}
              >
                {b}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FilterBrand
