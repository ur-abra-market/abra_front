import classNames from 'classnames';

import style from './Price.module.scss';

import { Checkbox, Input, Paragraph } from 'ui-kit';

export const Price = (): JSX.Element => {
  return (
    <div className={style.price}>
      <p className={style.title}>Price, $</p>

      <div className={style.wrapper}>
        <div className={style.inputs_wrapper}>
          <div className={style.input_wrapper}>
            <Paragraph size="s" className={style.input_title}>
              From
            </Paragraph>
            <Input className={classNames(style.input, style.input_left)} type="number" />
          </div>
          <div className={style.input_wrapper}>
            <Paragraph size="s" className={style.input_title}>
              Up To
            </Paragraph>
            <Input className={classNames(style.input, style.input_right)} type="number" />
          </div>
        </div>

        <div className={style.switcher_wrapper}>
          <Paragraph size="s" className={style.switcher_title}>
            Only discounted items
          </Paragraph>
          <Checkbox variant="notification" />
        </div>
      </div>
    </div>
  );
};
