import React, { FC } from 'react';
import './BtnNewBest.css';

interface BtnNewBestProps {
  name: string;
}
const BtnNewBest: FC<BtnNewBestProps> = ({ name }) => {
  return <div className="button_new_best">{name}</div>;
};

export default BtnNewBest;
