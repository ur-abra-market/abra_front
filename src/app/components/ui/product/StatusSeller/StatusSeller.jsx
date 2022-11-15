import React from 'react'
import style from './StatusSeller.module.css'

const StatusSeller = () => {
  const reward = 4.1
  const percent = `${(reward / 5) * 100}%`
  const years = 4
  const deals = 124
  const delivery = 98.4

  return (
    <div className={style.statusSeller}>
      <div className={style.statusSeller__basic}>
        <div className={style.statusSeller__avatar}></div>
        <div className={style.statusSeller__person}>
          <h4 className={style.statusSeller__person_name}>
            Ningbo Beilun Lonsyne
          </h4>
          <div className={style.statusSeller__person_reward}>
            <div className={style.statusSeller__star}>
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z"
                  fill="url('#SellerGradient')"
                />
                <linearGradient id="SellerGradient">
                  <stop stopColor="#000000" />
                  <stop offset={percent} stopColor="#000000" />
                  <stop offset={percent} stopColor="#B6B6B6" />
                  <stop offset="100%" stopColor="#B6B6B6" />
                </linearGradient>
              </svg>
            </div>
            <div className={style.statusSeller__numbers}>{reward}</div>
            <div className={style.statusSeller__status}>Experienced Seller</div>
          </div>
        </div>
      </div>
      <div className={style.statusSeller__activity}>
        <div className={style.statusSeller__deals}>
          <p>{years} Years of work</p>
          <p>{deals} Deals</p>
        </div>
        <div className={style.statusSeller__delivery}>
          <p>On-time delivery:</p>
          <p>{delivery}%</p>
        </div>
      </div>
      <div className={style.statusSeller__btn}></div>
    </div>
  )
}

export default StatusSeller
