import { FC } from 'react';

import cn from 'classnames';

import { Stats as Statistics } from 'assets/icons';
import { Paragraph } from 'ui-kit';

import style from './Stats.module.scss';

interface IStats {
  price: number;
  className?: string;
}

export const Stats: FC<IStats> = ({ price, className }): JSX.Element => {
  return (
    <div className={cn(style.stats_container, className)}>
      <div className={cn(style.grid_item, style.flex_column)}>
        <Paragraph size="m">Actual demand</Paragraph>
        <Paragraph size="m" weight="medium">
          100 bundles/mo
        </Paragraph>

        <span className={style.text}>*Average number for a monthly period</span>
      </div>
      <div className={cn(style.grid_item, style.flex_column)}>
        <Paragraph size="m">Sold per day</Paragraph>
        <Paragraph size="m" weight="medium">
          10pc
        </Paragraph>

        <span className={style.text}>*Average sales per day</span>
      </div>

      <div className={cn(style.grid_item, style.flex_row)}>
        <Paragraph size="m">Price changes</Paragraph>
        <span className={style.price_changes_text}>
          {`from ${(price - price * 0.1).toFixed(2)} up to ${price}`}
        </span>
      </div>
      <Statistics className={style.grid_item} />
    </div>
  );
};
