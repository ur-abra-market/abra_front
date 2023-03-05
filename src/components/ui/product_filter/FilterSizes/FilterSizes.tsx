import React, { useState } from 'react'

import style from './FilterSizes.module.css'

const FilterSizes = (): JSX.Element => {
  const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']
  const sizeCheck = sizeList.map(() => false)

  const [check, setCheck] = useState(sizeCheck)

  const changeState = (index: number): void => {
    const arrCheck = check.map((e, i) => (i === index ? !e : e))

    setCheck(arrCheck)
  }

  return (
    <div className={style.filter_sizes}>
      <h4>Sizes</h4>
      <div className={style.filter_sizes_list}>
        {sizeList.map((s, i) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={style.filter_sizes_list_item}
            style={{
              background: check[i] ? '#000000' : '#ffffff',
              color: check[i] ? '#ffffff' : '#000000'
            }}
            onClick={() => changeState(i)}
            key={`size_${s}`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterSizes
