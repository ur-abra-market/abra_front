import classNames from 'classnames';

import style from './Price.module.scss';

import { Checkbox, Input } from 'ui-kit';

export const Price = (): JSX.Element => {
  return (
    <div className={style.price}>
      <p className={style.title}>Price, $</p>

      <div className={style.wrapper}>
        <div className={style.inputs_wrapper}>
          <div className={style.input_wrapper}>
            <p className={style.input_title}>From</p>
            <Input className={classNames(style.input, style.input_left)} />
          </div>
          <div className={style.input_wrapper}>
            <p className={style.input_title}>Up To</p>
            <Input className={classNames(style.input, style.input_right)} />
          </div>
        </div>

        <div className={style.switcher_wrapper}>
          <p className={style.switcher_title}>Only discounted items</p>
          <Checkbox variant="notification" />
        </div>
      </div>
    </div>
  );
};
