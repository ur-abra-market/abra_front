import { FC } from 'react';

import { formatDate } from 'common/utils/formatDateProductsList';

interface IDateTimeContainer {
  className: string;
  created_at: string;
}

export const DateTimeContainer: FC<IDateTimeContainer> = ({ className, created_at }) => {
  const formattedDateTime = formatDate(created_at);
  const [formattedDate, formattedTime, formattedTimeAMPM] = formattedDateTime.split(' ');

  return (
    <div className={className}>
      <span>{formattedDate}</span>
      <span>{`${formattedTime} ${formattedTimeAMPM.toLowerCase()}`}</span>
    </div>
  );
};
