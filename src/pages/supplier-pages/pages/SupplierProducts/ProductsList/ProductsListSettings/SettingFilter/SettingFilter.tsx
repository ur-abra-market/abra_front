import React, { FC } from 'react';

interface ISettingFilter {
  classname: string;
  text: string;
  handler: () => void;
}

export const SettingFilter: FC<ISettingFilter> = ({
  handler,
  text,
  classname,
}): JSX.Element => {
  return (
    <span className={classname} onClick={handler} role="presentation">
      {text}
    </span>
  );
};
