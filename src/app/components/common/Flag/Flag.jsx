import React, { useState } from 'react'
import style from './Flag.module.css'

const Flag = () => {
  const [flag, setFlag] = useState(false)
  const color = flag ? '#000000' : '#D9D9D9'
  return (
    <div className={style.flag} onClick={() => setFlag(!flag)}>
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.1925 13.4081L5.98497 10.1156L1.77747 13.4081C1.23747 13.8356 0.442474 13.4456 0.442474 12.7556V2.35312C0.442474 1.43812 1.18497 0.703125 2.09247 0.703125H9.86997C10.785 0.703125 11.52 1.44562 11.52 2.35312V12.7556C11.5275 13.4456 10.74 13.8356 10.1925 13.4081Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

export default Flag
