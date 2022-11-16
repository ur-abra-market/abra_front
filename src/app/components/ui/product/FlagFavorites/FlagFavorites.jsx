import React from 'react'
import style from './FlagFavorites.module.css'
import {ReactComponent as FlagIcon} from '../../../common/Flag/flag.svg'
import PropTypes from 'prop-types'

const FlagFavorites = ({ active, onClick }) => {


  return (
    <div className={style.flagFavorites} onClick={() => onClick(!active)}>
      <div className={style.flagFavorites_sign} >
          <FlagIcon className={active ? style.active : ''} />
      </div>
      <div className={style.flagFavorites_text} style={!active ? {color: '#828282'} : {color: '#FC133D'}}>Added to Favorites</div>
    </div>
  )
}

FlagFavorites.propTypes= {
    onClick: PropTypes.func,
    active: PropTypes.bool,
}

export default FlagFavorites
