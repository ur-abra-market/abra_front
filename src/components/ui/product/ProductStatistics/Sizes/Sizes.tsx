import React, { FC, useState } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import style from './Sizes.module.css';

const isSizeSelected = ({ size, selectedSizes }: any) => {
  return selectedSizes.some((el: any) => el === size);
};

const SizeItem = ({ isSelected = false, label, onClick }: any) => {
  const handleClick = () => onClick?.(label);

  return (
    <div
      onClick={handleClick}
      className={cn(style['size-item'], {
        [style.base]: !isSelected,
        [style.selected]: isSelected,
      })}
    >
      {label}
    </div>
  );
};

SizeItem.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

interface SizesProps {
  sizes: any[];
  className?: string;
}
export const Sizes: FC<SizesProps> = ({ sizes }) => {
  const [selectedSizes, setSelectedSizes] = useState<any[]>([]);

  const addOrRemoveSize = (size: any) => {
    if (isSizeSelected({ size, selectedSizes }))
      setSelectedSizes(prevState => prevState.filter(item => item !== size));
    else setSelectedSizes(prevState => [...prevState, size]);
  };

  return (
    <>
      {sizes?.map((size, index) => (
        <SizeItem
          key={index}
          label={size}
          isSelected={isSizeSelected({ size, selectedSizes })}
          onClick={addOrRemoveSize}
        />
      ))}
    </>
  );
};
