import React from 'react';
import PropTypes from "prop-types";

const ButtonLink = (props) => {
  const {name, src, href, classes} = props;
  return (
    <a 
    className={classes.wrepperButtonLink}  
    href={href}>
      <div 
      className={classes.wrepperBtnImg}
      >
        <img 
          className={classes.btnImg}
          src={src} 
          alt="btn-header" />
      </div>
      <div 
      className={classes.btnName}
      >{name}</div>
    </a>
  )
}

ButtonLink.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  href: PropTypes.string,
  classes: PropTypes.object,
};

export default ButtonLink