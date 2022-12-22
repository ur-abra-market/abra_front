import React from 'react'
import PropTypes from 'prop-types'
import style from './Sizes.module.css'
import cn from 'classnames'


export const Sizes = ({sizes}) => {

    return (
        <>
            {sizes?.map((size, index) =>
                <div className={cn(style['size-item'], {
                    [style.base]: true,
                    [style.selected]: false,
                })} key={index}>
                    {size}
                </div>)
            }
        </>
    )
}

Sizes.propTypes = {
    sizes: PropTypes.array.isRequired,
    className: PropTypes.string,
}