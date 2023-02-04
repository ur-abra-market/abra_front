import React from 'react';

import PropTypes from 'prop-types';

import RelatedInputs from '../../RelatedInputs';

import style from './ProdInfoInputs.module.css';

const ProdInfoInputs = ({ register }) => {
  return (
    <div>
      <div className={style.prodInfoContainer}>
        <RelatedInputs
          register={register}
          isRequire
          mainName="mainPrice"
          mainType="number"
          mainTitle="Price per pc, USD *"
          mainPlaceholder="Enter the price per pc"
          optName="mainQuantity"
          optTitle="Minimum quantity to order *"
          optType="number"
          optPlaceholder="Enter quantity of products"
        />

        <RelatedInputs
          register={register}
          mainName="specPrice"
          mainType="number"
          mainTitle="Special price per pc, USD (optional)"
          mainPlaceholder="Enter the special price per pc"
          optName="specQuantity"
          optTitle="Quantity for special price"
          optType="number"
          optPlaceholder="Quantity to get special price"
        />
      </div>

      <p className={style.description}>
        You can set a discount per piece for the buyer from a certain amount of goods
      </p>
    </div>
  );
};

ProdInfoInputs.propTypes = {
  register: PropTypes.func,
};

export default ProdInfoInputs;
