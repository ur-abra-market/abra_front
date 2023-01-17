import React, { useState } from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import style from './Sizes.module.css';

const isSizeSelected = ({ size, selectedSizes }) => {
  return selectedSizes.some(el => el === size);
};

const SizeItem = ({ isSelected = false, label, onClick }) => {
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

export const Sizes = ({ sizes }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const addOrRemoveSize = size => {
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

Sizes.propTypes = {
  sizes: PropTypes.array.isRequired,
  className: PropTypes.string,
};
