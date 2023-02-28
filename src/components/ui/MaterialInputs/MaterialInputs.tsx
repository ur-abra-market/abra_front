import React, { FC, useState } from 'react';

import RelatedInputs from '../../RelatedInputs';

import style from './MaterialInputs.module.css';

const fakeArr: number[] = [];

interface MaterialInputsProps {
  register: any;
  mainTitle: string;
  optTitle: string;
  mainPlaceholder: string;
  optPlaceholder: string;
  mainType: string;
  optType: string;
}
const MaterialInputs: FC<MaterialInputsProps> = ({
  register,
  mainTitle,
  optTitle,
  mainPlaceholder,
  optPlaceholder,
  mainType,
  optType,
}) => {
  const [count, setCount] = useState(1);

  const addInputs = (): void => {
    setCount(count + 1);
    fakeArr.push(count);
  };

  return (
    <div className={style.inputsContainer}>
      <RelatedInputs
        register={register}
        mainTitle={mainTitle}
        mainName="main0"
        mainType={mainType}
        mainPlaceholder={mainPlaceholder}
        optTitle={optTitle}
        optName="opt0"
        optType={optType}
        optPlaceholder={optPlaceholder}
      />

      {fakeArr.map(e => {
        return (
          <div key={e}>
            <RelatedInputs
              register={register}
              mainName={`main${e}`}
              mainType={mainType}
              mainPlaceholder={mainPlaceholder}
              optName={`opt${e}`}
              optType={optType}
              optPlaceholder={optPlaceholder}
            />
          </div>
        );
      })}

      <p className={style.add} onClick={addInputs}>
        + Add material
      </p>
    </div>
  );
};

export default MaterialInputs;
