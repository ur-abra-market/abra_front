import React, { FC } from 'react';

import { StarIcon } from '../../../../assets/img';

import style from './Reward.module.css';

interface RewardProps {
  star: boolean;
  grade: any;
}
const Reward: FC<RewardProps> = ({ star, grade }) => {
  // const { grade_average, count } = grade

  const thousands = grade?.count > 999 ? Math.floor(grade?.count / 1000) : '';
  const remainder =
    grade?.count < 1000 ? grade?.count : `${grade?.count % 1000}`.padStart(3, '0');

  return (
    <div className={style.reward}>
      <div className={star ? `${style.reward__star}` : 'none-star'}>
        <StarIcon />
      </div>
      <div
        className={style.reward_numbers}
      >{`${grade?.grade_average} / ${thousands} ${remainder} reviews`}</div>
    </div>
  );
};

export default Reward;
