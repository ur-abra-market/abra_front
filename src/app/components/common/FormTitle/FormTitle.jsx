import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import style from './FormTitle.module.css'

const FormTitle = ({ title, text, step, link }) => {
  return (
    <div className={style.textWrapper}>
      <p className={style.title}>{title}</p>
      <p className={style.text}>{text}</p>

      <div className={style.stepWrapper}>
        <p className={style.step}>{step}</p>
        <Link to={'/'} className={style.link}>
          {link}
        </Link>
      </div>
    </div>
  )
}
FormTitle.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  step: PropTypes.string,
  link: PropTypes.string
}
export default FormTitle
