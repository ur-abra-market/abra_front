import React from 'react'
import PropTypes from 'prop-types'
import ShopItem from '../ShopItem/ShopItem'
import style from './CartList.module.css'

const CartList = ({cartItems}) => {

    return (
        <div className={style.cartItems}>
            <span className={style.cartItems__title}>My Cart (3 Items)</span>
            {cartItems.map(item =>
                <ShopItem key={item.id} shopItem={item}/>
            )}
        </div>
    )
}

CartList.propTypes = {
    cartItems: PropTypes.array
}

export default CartList


