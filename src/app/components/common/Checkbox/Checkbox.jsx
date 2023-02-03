import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ label, classes, defaultChecked, register }) => {
  return (
    <>
      <label className={classes.labelCheckbox}>
        {label}
        <input
          type="checkbox"
          className={classes.inputCheckbox}
          defaultChecked={defaultChecked}
          {...register}
        />
      </label>
    </>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  classes: PropTypes.object,
  register: PropTypes.object,
  defaultChecked: PropTypes.bool
}

export default Checkbox
