import React, { useState } from 'react'

import CartList from '../../components/ui/TypesView/cart/CartList/CartList'
import CartOrder from '../../components/ui/TypesView/cart/CartOrder/CartOrder'
import Footer from '../../layouts/Footer'
import Header from '../../layouts/Header'

import style from './CartPage.module.css'

const CartPage = (): JSX.Element => {
  const [cartItems] = useState([
    {
      id: 13,
      name: 'Beilun Lonsyne',
      rating: 4.2,
      checked: true,
      delivery: { date: '27.07.2023', method: 'Abra Shipment' },
      products: [
        {
          id: 222,
          checked: true,
          name: 'Summer Casual Dress',
          color: 'silver',
          size: 'S',
          minQuantity: 100,
          quantity: 100,
          price: 780
        }
      ]
    },
    {
      id: 14,
      name: 'Ningbo Beilun Lonsyne',
      rating: 4.1,
      checked: true,
      delivery: { date: '25.07.2023', method: 'Abra Shipment' },
      products: [
        {
          id: 111,
          checked: false,
          name: 'Summer Casual Dress',
          color: 'silver',
          size: 'S',
          minQuantity: 100,
          quantity: 100,
          price: 650
        },
        {
          id: 333,
          checked: true,
          name: 'Summer Casual Dress',
          color: 'silver',
          size: 'S',
          minQuantity: 100,
          quantity: 100,
          price: 950
        }
      ]
    }
  ])
  const [orderInfo] = useState({
    items: 600,
    goodsCost: 1560,
    shipping: 440,
    totalCost: 2000
  })

  return (
    <>
      <Header />
      <div className={style.cart_page}>
        <CartList cartItems={cartItems} />
        <CartOrder info={orderInfo} />
      </div>
      <Footer />
    </>
  )
}

export default CartPage
