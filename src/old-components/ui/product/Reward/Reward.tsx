import { FC } from 'react';

import style from './Reward.module.scss';

import { StarEmptyIcon } from 'assets/icons';

interface RewardProps {
  star: boolean;
  grade: any;
}
const Reward: FC<RewardProps> = ({ star, grade }) => {
  // const { grade_average, count } = grade

  // eslint-disable-next-line no-unsafe-optional-chaining,no-magic-numbers
  const thousands = grade?.count > 999 ? Math.floor(grade?.count / 1000) : '';
  const remainder =
    // eslint-disable-next-line no-unsafe-optional-chaining,no-magic-numbers
    grade?.count < 1000;
  // ? grade?.count
  // : `${grade?.count % 1000}`.padStart(3, '0')

  return (
    <div className={style.reward}>
      <div className={star ? `${style.reward_star}` : 'none-star'}>
        <StarEmptyIcon />
      </div>
      <div
        className={style.reward_numbers}
      >{`${grade?.grade_average} / ${thousands} ${remainder} reviews`}</div>
    </div>
  );
};

export default Reward;
