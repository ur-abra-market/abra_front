import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import RelatedInputs from '../../common/RelatedInputs'
import style from './MaterialInputs.module.css'

let fakeArr = []
const MaterialInputs = ({
  register,
  mainTitle,
  optTitle,
  mainPlaceholder,
  optPlaceholder,
  mainType,
  optType
}) => {
  const [count, setCount] = useState(1)

  const addInputs = () => {
    setCount(count + 1)
    fakeArr.push(count)
  }

  return (
    <div className={style.inputsContainer}>
      <RelatedInputs
        register={register}
        mainTitle={mainTitle}
        mainName={`main0`}
        mainType={mainType}
        mainPlaceholder={mainPlaceholder}
        optTitle={optTitle}
        optName={`opt0`}
        optType={optType}
        optPlaceholder={optPlaceholder}
      />

      {fakeArr.map((e) => {
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
        )
      })}

      <p className={style.add} onClick={addInputs}>
        + Add material
      </p>
    </div>
  )
}
MaterialInputs.propTypes = {
  register: PropTypes.func,
  mainTitle: PropTypes.string,
  optTitle: PropTypes.string,
  mainPlaceholder: PropTypes.string,
  optPlaceholder: PropTypes.string,
  mainType: PropTypes.string,
  optType: PropTypes.string
}
export default MaterialInputs
