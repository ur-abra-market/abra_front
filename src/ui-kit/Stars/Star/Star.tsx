import React, { FC, useId } from 'react';

export interface IStar {
  percent: string;
  sizes?: string;
}

export const Star: FC<IStar> = ({ percent, sizes }) => {
  const uniqueId = useId();

  return (
    <svg
      width={sizes || '16'}
      height={sizes || '15'}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
        fill={`url('#StarGradient${uniqueId}')`}
      />
      <linearGradient id={`StarGradient${uniqueId}`}>
        <stop stopColor="#FFAB5E" />
        <stop offset={percent} stopColor="#FFAB5E" />
        <stop offset={percent} stopColor="#B6B6B6" />
        <stop offset="100%" stopColor="#B6B6B6" />
      </linearGradient>
    </svg>
  );
};
