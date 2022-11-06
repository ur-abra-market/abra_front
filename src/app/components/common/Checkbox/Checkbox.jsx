import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ label, classes }) => {
  return (
    <>
      <label className={classes.labelCheckbox}>
        {label}
        <input type="checkbox" className={classes.inputCheckbox} />
      </label>
    </>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  classes: PropTypes.object
}

export default Checkbox
