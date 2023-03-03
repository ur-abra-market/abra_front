import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { material } from '../../../../store/reducers/filterSlice';
import SearchFilter from '../SearchFilter';
import './FilterMaterial.module.css';

const FilterMaterial = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const materialList = ['Cotton', 'Chiffon', 'Linen', 'Biflex', 'Silk', 'Satin'];
  const materials = useAppSelector(state => state.filter.materials);
  // @ts-ignore
  const len = materialList.map(m => materials.includes(m.toLowerCase())).filter(e => !e);

  const changeState = (ctx: any): void => {
    const arrCheck = materialList
      // @ts-ignore
      .map(m => materials.includes(m.toLowerCase()))
      .map((e, i) => (materialList[i] === ctx ? !e : e));
    const materialArr = materialList
      .filter((_, i) => arrCheck[i])
      .map(m => m.toLowerCase());

    dispatch(material(materialArr));
  };

  return (
    <div className="FilterMaterial">
      <h4 className="FilterMaterial__title">Material</h4>
      <SearchFilter typeSearch="material" />
      <div
        className="FilterMaterial__btns"
        // @ts-ignore
        style={{ gap: len < materialList.length ? '24px' : '0px' }}
      >
        <div className="FilterMaterial__list">
          {materialList
            // @ts-ignore
            .filter(m => materials.includes(m.toLowerCase()))
            .map(m => (
              <div
                className="FilterMaterial__list_item filter-item_active"
                style={{ background: '#000000', color: '#ffffff' }}
                onClick={() => changeState(m)}
                key={`material_${m}`}
              >
                {m}
              </div>
            ))}
        </div>
        <div className={len ? 'FilterMaterial__list' : 'none'}>
          {materialList
            // @ts-ignore
            .filter(m => !materials.includes(m.toLowerCase()))
            .map(m => (
              <div
                className="FilterMaterial__list_item"
                style={{ background: '#e5e5e5', color: '#000000' }}
                onClick={() => changeState(m)}
                key={`material_${m}`}
              >
                {m}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterMaterial;

// import React, { useState } from 'react';
//
// import SearchFilter from '../SearchFilter';
//
// import style from './FilterMaterial.module.css';
//
// const FilterMaterial = () => {
//     const materialList = ['Cotton', 'Chiffon', 'Linen', 'Biflex', 'Silk', 'Satin'];
//     const materialCheck = materialList.map(() => false);
//     const [check, setCheck] = useState(materialCheck);
//     const [len, setLen] = useState(materialCheck.length);
//
//     const changeState = ctx => {
//         const arrCheck = check.map((e, i) => (materialList[i] === ctx ? !e : e));
//
//         setLen(arrCheck.filter(e => !e).length);
//         setCheck(arrCheck);
//     };
//
//     return (
//         <div className={style.filterMaterial}>
//             <h4 className={style.filterMaterial__title}>Material</h4>
//             <SearchFilter />
//             <div
//                 className={style.filterMaterial__btns}
//                 style={{ gap: len < check.length ? '24px' : '0px' }}
//             >
//                 <div className={style.filterMaterial__list}>
//                     {materialList
//                         .filter((b, i) => check[i])
//                         .map(m => (
//                             <div
//                                 className={style.filterMaterial__list_item + style.filter_item_active}
//                                 style={{ background: '#000000', color: '#ffffff' }}
//                                 onClick={() => changeState(m)}
//                                 key={`material_${m}`}
//                             >
//                                 {m}
//                             </div>
//                         ))}
//                 </div>
//                 <div className={len ? `${style.filterMaterial__list}` : 'none'}>
//                     {materialList
//                         .filter((b, i) => !check[i])
//                         .map(m => (
//                             <div
//                                 className={style.filterMaterial__list_item}
//                                 style={{ background: '#e5e5e5', color: '#000000' }}
//                                 onClick={() => changeState(m)}
//                                 key={`material_${m}`}
//                             >
//                                 {m}
//                             </div>
//                         ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default FilterMaterial;
