import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import CheckboxStyledElem from '../../common/checkboxStyledElem'
import style from './CheckboxFor.module.css'

const CheckboxFor = ({ register, array, title, getValues, typeId }) => {
  const validate = useCallback(() => {
    const values = getValues(array.map((el) => `${typeId}-${el}`))

    const isValid = values.some((el) => el)

    return isValid
  }, [])
  return (
    <div>
      <p className={style.title}>{title}</p>

      <div className={style.checkboxWrapper}>
        {array &&
          array.map((el) => {
            return (
              <CheckboxStyledElem
                key={el}
                typeId={typeId}
                size={el}
                register={register(`${typeId}-${el}`, {
                  validate
                })}
              />
            )
          })}
      </div>
    </div>
  )
}
CheckboxFor.propTypes = {
  register: PropTypes.func,
  array: PropTypes.array,
  title: PropTypes.string,
  getValues: PropTypes.func,
  typeId: PropTypes.number
}
export default CheckboxFor
