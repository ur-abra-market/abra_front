import React, { FC } from 'react';

import style from './TypeBar.module.css';

interface Types {
  id: number;
  selected: boolean;
}

interface TypeBarProps {
  types: Types[];
  setTypes: (arr: Types[]) => void;
}
const TypeBar: FC<TypeBarProps> = ({ types, setTypes }) => {
  const addTypeHandler = (): void => {
    const newType = { id: types.length + 1, selected: true };

    setTypes([...types.map(el => ({ ...el, selected: false })), newType]);
  };

  const changeSelectedTypeHandler = (id: any): void => {
    setTypes(
      types.map(el =>
        el.id === id ? { ...el, selected: true } : { ...el, selected: false },
      ),
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {types.map(type => (
        <button
          key={type.id}
          onClick={() => changeSelectedTypeHandler(type.id)}
          type="button"
          className={type.selected ? style.btn_active : style.btn}
        >
          Type {type.id}
        </button>
      ))}

      <button type="button" className={style.btn_plus} onClick={addTypeHandler}>
        +
      </button>
    </div>
  );
};

export default TypeBar;
