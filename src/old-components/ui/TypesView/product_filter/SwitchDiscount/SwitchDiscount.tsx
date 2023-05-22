import React, { FC } from 'react';

import { useAppDispatch } from '../../../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../../../common/hooks/useAppSelector';
import { discount } from '../../../../../store/reducers/filterSlice';

import styles from './SwitchDiscount.module.css';

const SwitchDiscount: FC = () => {
  const dispatch = useAppDispatch();

  const choiceDiscount = useAppSelector(state => state.filter.discount);
  const background = choiceDiscount ? '#000000' : '#e0e0e0';
  const justifyContent = choiceDiscount ? 'end' : 'flex-start';

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Only discounted items</div>
      <div
        role="presentation"
        className={styles.box}
        style={{ background, justifyContent }}
        onClick={() => dispatch(discount(!choiceDiscount))}
      >
        <div className={styles.box_btn} />
      </div>
    </div>
  );
};

export default SwitchDiscount;
