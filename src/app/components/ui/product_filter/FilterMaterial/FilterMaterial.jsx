import React, { useState } from 'react'
import SearchFilter from '../SearchFilter'
import style from './FilterMaterial.module.css'

const FilterMaterial = () => {
  const materialList = ['Cotton', 'Chiffon', 'Linen', 'Biflex', 'Silk', 'Satin']
  const materialCheck = materialList.map(() => false)
  const [check, setCheck] = useState(materialCheck)
  const [len, setLen] = useState(materialCheck.length)

  const changeState = (ctx) => {
    const arrCheck = check.map((e, i) => (materialList[i] === ctx ? !e : e))
    setLen(arrCheck.filter((e) => !e).length)
    setCheck(arrCheck)
  }

  return (
    <div className={style.filterMaterial}>
      <h4 className={style.filterMaterial__title}>Material</h4>
      <SearchFilter />
      <div
        className={style.filterMaterial__btns}
        style={{ gap: len < check.length ? '24px' : '0px' }}
      >
        <div className={style.filterMaterial__list}>
          {materialList
            .filter((b, i) => check[i])
            .map((m) => (
              <div
                className={
                  style.filterMaterial__list_item + style.filter_item_active
                }
                style={{ background: '#000000', color: '#ffffff' }}
                onClick={() => changeState(m)}
                key={`material_${m}`}
              >
                {m}
              </div>
            ))}
        </div>
        <div className={len ? `${style.filterMaterial__list}` : 'none'}>
          {materialList
            .filter((b, i) => !check[i])
            .map((m) => (
              <div
                className={style.filterMaterial__list_item}
                style={{ background: '#e5e5e5', color: '#000000' }}
                onClick={() => changeState(m)}
                key={`material_${m}`}
              >
                {m}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default FilterMaterial
