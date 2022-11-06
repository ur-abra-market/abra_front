import React from 'react'
import PropTypes from 'prop-types'
import TypeBar from './TypeBar/TypeBar'
import TypeList from './TypeList/TypeList'

const TypesPage = ({ variations, getValues, register, setTypes, types }) => {
  const [sizes, colors] = [variations['size'], variations['color']]

  return (
    <>
      <TypeBar types={types} setTypes={setTypes} />

      <TypeList
        types={types}
        sizes={sizes}
        colors={colors}
        getValues={getValues}
        register={register}
      />
    </>
  )
}

TypesPage.propTypes = {
  variations: PropTypes.object,
  getValues: PropTypes.func,
  register: PropTypes.func,
  setTypes: PropTypes.func,
  types: PropTypes.array
}
export default TypesPage
