import React, {useState} from 'react'
import style from './Flag.module.css'
import cn from 'classnames'
import {ReactComponent as FlagIcon} from './flag.svg'
import PropTypes from 'prop-types'

const Flag = ({className}) => {
    const [flag, setFlag] = useState(false)

    return (
        <div className={cn(style.flag, className)}
             onClick={(e) => {
                 e.stopPropagation()
                 setFlag(!flag)
             }}
        >
            <FlagIcon className={flag ? style.active : ''}/>
        </div>
    )
}

Flag.propTypes = {
    className: PropTypes.string
}

export default Flag
