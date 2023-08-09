import { FC } from 'react';

import style from './ShowBy.module.scss';

import { Select, ISelectOption } from 'ui-kit';

const dataForShowBy = [
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

interface IShowBy {
  onChange: (value: number) => void;
}

export const ShowBy: FC<IShowBy> = ({ onChange }) => {
  const handlerChangeSelect = (selectOption: ISelectOption): void => {
    onChange(selectOption.value);
  };

  return (
    <div className={style.wrapper}>
      <p className={style.title}>Show by</p>
      <Select
        options={dataForShowBy}
        menuItemsPosition="up"
        className={style.select}
        onChange={handlerChangeSelect}
      />
    </div>
  );
};
