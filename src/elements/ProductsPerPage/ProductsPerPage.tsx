import { FC } from 'react';

import style from './ProductsPerPage.module.scss';

import { Select, ISelectOption } from 'ui-kit';

const productsPerPageOptions = [
  {
    label: { text: '20' },
    value: 20,
  },
  {
    label: { text: '40' },
    value: 40,
  },
  {
    label: { text: '60' },
    value: 60,
  },
  {
    label: { text: '80' },
    value: 80,
  },
  {
    label: { text: '100' },
    value: 100,
  },
];

interface IProductsPerPage {
  onChange: (value: number) => void;
  controlledValue?: ISelectOption;
  disabled?: boolean;
}

export const ProductsPerPage: FC<IProductsPerPage> = ({
  onChange,
  controlledValue,
  disabled,
}) => {
  const handleChangeSelect = (selectOption: ISelectOption): void => {
    onChange(Number(selectOption.value));
  };

  return (
    <div className={style.wrapper}>
      <p className={style.title}>Show by</p>

      <Select
        disabled={disabled}
        controlledValue={controlledValue}
        options={productsPerPageOptions}
        menuItemsPosition="up"
        className={style.select}
        onChange={handleChangeSelect}
      />
    </div>
  );
};
