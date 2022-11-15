import React, { useState } from 'react'
import style from './FilterGrowth.module.css'

const FilterGrowth = () => {
  const growthList = [
    '44-51',
    '63-67',
    '75-80',
    '87-92',
    '105-110',
    '129-134',
    '141-146',
    '146-152',
    '158-164',
    '170-176',
    '182-188'
  ]
  const growthCheck = growthList.map(() => false)

  const [check, setCheck] = useState(growthCheck)

  const changeState = (index) => {
    const arrCheck = check.map((e, i) => (i === index ? !e : e))
    setCheck(arrCheck)
  }

  return (
    <div className={style.filterGrowth}>
      <h4>Growth, cm</h4>
      <div className={style.filterGrowth__list}>
        {growthList.map((s, i) => (
          <div
            className={style.filterGrowth__list_item}
            style={{
              background: check[i] ? '#000000' : '#ffffff',
              color: check[i] ? '#ffffff' : '#000000'
            }}
            onClick={() => changeState(i)}
            key={`growth_${s}`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterGrowth
