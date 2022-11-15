import React from 'react'
import PropTypes from 'prop-types'
import style from './ContentMessage.module.css'

const ContentMessage = ({ title, text }) => {
  return (
    <>
      <div className={style.header}>{title}</div>
      <div className={style.subheader}>{text}</div>
    </>
  )
}
ContentMessage.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}
export default ContentMessage
