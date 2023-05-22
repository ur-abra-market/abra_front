import React, { FC, useId } from 'react';

export interface IStar {
  percent: string;
}

export const Star: FC<IStar> = ({ percent }) => {
  const uniqueId = useId();

  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 15L9.79611 9.47214H15.6085L10.9062 6.05573L12.7023 0.527864L8 3.94427L3.29772 0.527864L5.09383 6.05573L0.391548 9.47214H6.20389L8 15Z"
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
