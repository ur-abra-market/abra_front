import React from 'react'
import PropTypes from 'prop-types'
import style from './NavBarUniversal.module.css'

const NavBarUniversal = ({ logo, children }) => {
  return (
    <nav className={style.navBarWrapper}>
      <h1 className={style.logoSection}>{logo}</h1>
      <div className={style.linksSection}>{children}</div>
    </nav>
  )
}
NavBarUniversal.propTypes = {
  logo: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.node, PropTypes.array)
}
export default NavBarUniversal
