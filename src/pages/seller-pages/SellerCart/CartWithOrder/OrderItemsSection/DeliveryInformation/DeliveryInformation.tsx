import React from 'react';

import { DotIcon } from 'assets/icons';
import { Paragraph } from 'ui-kit';

import style from './DeliveryInformation.module.scss';

export const DeliveryInformation = (): JSX.Element => {
  return (
    <div className={style.delivery_info}>
      <div className={style.delivery_time}>
        <Paragraph size="s2">
          Estimated delivery:
          <span> 27.07.2022</span>
          {/* todo */}
        </Paragraph>
      </div>
      <DotIcon />
      <div className={style.delivery_method}>
        <Paragraph size="s2">
          Delivery method:
          <span> Abra Shipment</span>
          {/* todo */}
        </Paragraph>
      </div>
    </div>
  );
};
