import React from 'react'
import { Link } from 'react-router-dom'
import style from './FooterForSupplierPart.module.css'

const Footer = () => {
  return (
    <div className={style.footer}>
      <Link to="/" className={style.footer_logo}>
        Abra
      </Link>
      <div className={style.footer_linksWrapper}>
        <Link to="/" className={style.footer_link}>
          Contact Support
        </Link>
        <Link to="/" className={style.footer_link}>
          FAQ
        </Link>
        <Link to="/" className={style.footer_link}>
          Terms & Conditions
        </Link>
        <Link to="/" className={style.footer_link}>
          Privacy Policy
        </Link>
      </div>
      <div className={style.footer_copyright}>© Copyright 2022</div>
    </div>
  )
}

export default Footer
