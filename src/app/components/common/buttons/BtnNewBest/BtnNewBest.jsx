import React from 'react'
import PropTypes from 'prop-types'
import './BtnNewBest.css'

const BtnNewBest = ({ name }) => {
  return <div className="BtnNewBest">{name}</div>
}
BtnNewBest.propTypes = {
  name: PropTypes.string
}
export default BtnNewBest
