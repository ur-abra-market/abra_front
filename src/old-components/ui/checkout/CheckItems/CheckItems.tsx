import { FC, useState } from 'react';

import { AddNotePopup } from '../../popup/AddNotePopup/AddNotePopup';

import style from './CheckItems.module.scss';

import { StarFilledIcon, ArrowRightIcon, DotIcon } from 'assets/icons'; // 5 10px for ArrowRightIcon
import { Banner1Image } from 'assets/images';

interface CheckItemsProps {
  index: string;
}

const CheckItems: FC<CheckItemsProps> = ({ index }): JSX.Element => {
  const [modal, setModal] = useState(false);

  const onClick = (): void => {
    setModal(true);
  };

  return (
    <div className={style.check_items}>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <div className={style.check_items_container}>
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
        {+index ? <></> : <h4 className={style.check_items_title}>Items to Order</h4>}
        <div className={style.check_items_block}>
          <div className={style.check_items_block_rating}>
            <StarFilledIcon />
            <span className={style.check_items_rating}>4.1</span>
            <div className={style.check_items_block_seller}>Ningbo Beilun Lonsyne</div>
            <ArrowRightIcon />
          </div>

          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={style.check_items_block_note} onClick={onClick}>
            + Add a note
          </div>
          <AddNotePopup modal={modal} setModal={setModal} />
        </div>
        <div className={style.check_items_product}>
          <img src={Banner1Image} alt="" />
          <div className={style.check_items_product_info}>
            <div className={style.check_items_product_info_name}>
              Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall Clothes
            </div>
            <div className={style.check_items_product_info_property}>
              <span className={style.check_items_text_product}>Color: Silver</span>
              <span className={style.check_items_text_product}>Size: S</span>
              <span className={style.check_items_text_product}>Quantity: 100</span>
            </div>
            <div className={style.check_items_product_info_price}>$780</div>
            <div className={style.check_items_product_info_offer}>
              <span>300pcs</span>
              <span className={style.check_items_line} />
              <span className={style.check_items_line_new_price} />
              <span>$4.2/1pcs</span>
              <span className={style.check_items_new_price}>4.0$/1pcs</span>
            </div>
          </div>
        </div>
      </div>

      <div className={style.check_items_delivery}>
        <div className={style.check_items_delivery_info}>
          Estimated delivery: 27.07.2022
        </div>
        <DotIcon className={style.check_items_delivery_point} />
        <div className={style.check_items_delivery_info}>
          Delivery method: Abra Shipment
        </div>
      </div>
    </div>
  );
};

export default CheckItems;
