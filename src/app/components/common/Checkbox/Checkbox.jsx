import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ label, classes, defaultChecked }) => {
  return (
    <>
      <label className={classes.labelCheckbox}>
        {label}
        <input
          type="checkbox"
          className={classes.inputCheckbox}
          defaultChecked={defaultChecked}
        />
      </label>
    </>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  classes: PropTypes.object,
  defaultChecked: PropTypes.bool
}

export default Checkbox
