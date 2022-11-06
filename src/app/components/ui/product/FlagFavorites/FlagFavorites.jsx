import React from 'react'
import style from './FlagFavorites.module.css'

const FlagFavorites = () => {
  return (
    <div className={style.flagFavorites}>
      <div className={style.flagFavorites_sign}>
        <svg
          width="8.31"
          height="9.66"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1925 13.4081L5.98497 10.1156L1.77747 13.4081C1.23747 13.8356 0.442474 13.4456 0.442474 12.7556V2.35312C0.442474 1.43812 1.18497 0.703125 2.09247 0.703125H9.86997C10.785 0.703125 11.52 1.44562 11.52 2.35312V12.7556C11.5275 13.4456 10.74 13.8356 10.1925 13.4081Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
      <div className={style.flagFavorites_text}>Added to Favorites</div>
    </div>
  )
}

export default FlagFavorites
