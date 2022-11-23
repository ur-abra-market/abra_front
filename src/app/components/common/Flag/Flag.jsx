import React, { useState } from 'react'
import style from './Flag.module.css'
import { ReactComponent as FlagIcon} from './flag.svg'

const Flag = () => {
  const [flag, setFlag] = useState(false)

  return (
    <div className={style.flag} onClick={(e) => {e.stopPropagation(); setFlag(!flag)}}>
        <FlagIcon className={flag ? style.active : ''} />
    </div>
  )
}

export default Flag
