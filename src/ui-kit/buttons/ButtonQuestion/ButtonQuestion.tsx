import { FC } from 'react';

import cn from 'classnames';

import { ContactUsQuestionMarkIcon } from 'assets/icons';

import style from './ButtonQuestion.module.scss';

interface IButtonQuestion {
  className?: string;
}

export const ButtonQuestion: FC<IButtonQuestion> = ({ className }): JSX.Element => {
  return (
    <div className={style.wrapper}>
      <a
        className={cn(style.link, className)}
        href="https://wa.me/79119681844?text=Hi%2C%20"
        target="_blank"
        rel="noreferrer"
      >
        <ContactUsQuestionMarkIcon className={style.icon} />
      </a>
    </div>
  );
};
