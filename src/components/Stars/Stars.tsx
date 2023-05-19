import React, { FC } from 'react';

import style from './Stars.module.css';

import Star from 'components/Stars/Star';
import { IStarsProps } from 'components/Stars/Stars.props';

const Stars: FC<IStarsProps> = ({ reward }): JSX.Element => {
  const value = `${100 * (reward - Math.floor(reward))}%`;
  let percent = ['100%', '100%', '100%', '100%', '100%'];

  switch (Math.ceil(reward)) {
    case 0:
      percent = ['0%', '0%', '0%', '0%', '0%'];
      break;
    case 1:
      if (reward < 1) percent = [value, '0%', '0%', '0%', '0%'];
      if (reward === 1) percent = ['100%', '0%', '0%', '0%', '0%'];
      break;
    case 2:
      if (reward < 2) percent = ['100%', value, '0%', '0%', '0%'];
      if (reward === 2) percent = ['100%', '100%', '0%', '0%', '0%'];
      break;
    case 3:
      if (reward < 3) percent = ['100%', '100%', value, '0%', '0%'];
      if (reward === 3) percent = ['100%', '100%', '100%', '0%', '0%'];
      break;
    case 4:
      if (reward < 4) percent = ['100%', '100%', '100%', value, '0%'];
      if (reward === 4) percent = ['100%', '100%', '100%', '100%', '0%'];
      break;
    case 5:
      if (reward < 5) percent = ['100%', '100%', '100%', '100%', value];
      if (reward === 5) percent = ['100%', '100%', '100%', '100%', '100%'];
      break;
    default:
  }

  return (
    <div className={style.stars}>
      {percent.map((p, i) => {
        return <Star key={i} percent={p} />;
      })}
    </div>
  );
};

export default Stars;
