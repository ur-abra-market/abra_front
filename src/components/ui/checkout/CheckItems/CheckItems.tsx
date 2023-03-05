import React, { FC } from 'react'

import style from './CheckItems.module.css'

interface CheckItemsProps {
  index: string
}

const CheckItems: FC<CheckItemsProps> = ({ index }): JSX.Element => {
  return (
    <div className={style.check_items}>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      {+index ? <></> : <h4>Items to Order</h4>}
      <div className={style.check_items_block}>
        <div className={style.check_items_block_seller}>
          Ningbo Beilun Lonsyne
        </div>
        <div className={style.check_items_block_note}>+ Add a note</div>
      </div>
      <div className={style.check_items_product}>
        <div className={style.check_items_product_photo} />
        <div className={style.check_items_product_info}>
          <div className={style.check_items_product_info_name}>
            Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
            Clothes
          </div>
          <div className={style.check_items_product_info_property}>
            <span>Color: Silver</span>
            <span>Quantity: 100</span>
          </div>
          <div className={style.check_items_product_info_price}>$780</div>
          <div className={style.check_items_product_info_offer}>
            Special offer: ≥ 100 = 1pc/$7.80
          </div>
        </div>
      </div>
      <div className={style.check_items_delivery}>
        <div className={style.check_items_delivery_info}>
          Processing time: 14 day
        </div>
        <div className={style.check_items_delivery_point} />
        <div className={style.check_items_delivery_info}>
          Estimated delivery: 27.07.2022
        </div>
        <div className={style.check_items_delivery_point} />
        <div className={style.check_items_delivery_info}>
          Delivery method: Abra Shipment
        </div>
      </div>
    </div>
  )
}

export default CheckItems
