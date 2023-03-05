import React, { useState } from 'react'

import style from './FilterGrowth.module.css'

const FilterGrowth = (): JSX.Element => {
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

  const changeState = (index: number): void => {
    const arrCheck = check.map((e, i) => (i === index ? !e : e))

    setCheck(arrCheck)
  }

  return (
    <div className={style.filter_growth}>
      <h4>Growth, cm</h4>
      <div className={style.filter_growth_list}>
        {growthList.map((s, i) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={style.filter_growth_list_item}
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
