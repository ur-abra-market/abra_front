import React, { FC } from 'react';
import './BtnNewBest.css';

interface BtnNewBestProps {
  name: string;
}
const BtnNewBest: FC<BtnNewBestProps> = ({ name }) => {
  return <div className="BtnNewBest">{name}</div>;
};

export default BtnNewBest;
