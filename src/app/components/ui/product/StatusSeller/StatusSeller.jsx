import React from 'react'
import style from './StatusSeller.module.css'
import PropTypes from 'prop-types'
import {ReactComponent as HangerIcon} from './../../../pages/ProductPage/hanger_icon.svg'
import {ReactComponent as StarIcon} from './../../../pages/ProductPage/Star.svg'

const StatusSeller = ({supplierInfo}) => {
  const {name, grade_average, total_deals} = supplierInfo

  return (
    <div className={style.statusSeller}>
      <div className={style.statusSeller__basic}>
        <div className={style.statusSeller__avatar}>
          <HangerIcon/>
        </div>
        <div className={style.statusSeller__person}>
          <h4 className={style.statusSeller__person_name}>
            {name}
          </h4>
          <div className={style.statusSeller__person_reward}>
            <div className={style.statusSeller__star}>
              <StarIcon/>
            </div>
            <div className={style.statusSeller__numbers}>{grade_average}</div>
          </div>
        </div>
      </div>
      <div className={style.statusSeller__activity}>
        <div className={style.statusSeller__deals}>
          <p>{total_deals} Deals</p>
        </div>
      </div>
      <div className={style.statusSeller__btn}></div>
    </div>
  )
}

StatusSeller.propTypes = {
  supplierInfo: PropTypes.object.isRequired
}

export default StatusSeller
