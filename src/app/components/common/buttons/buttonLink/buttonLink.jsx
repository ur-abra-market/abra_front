import React from "react";
import PropTypes from "prop-types";

const ButtonLink = (props) => {
  const { name, src, classes, children } = props;
  return (
    <>
      <div className={classes.wrepperBtnImg}>
        {children}
        <img className={classes.btnImg} src={src} alt="btn-header" />
      </div>
      <div className={classes.btnName}>{name}</div>
    </>
  );
};

ButtonLink.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  classes: PropTypes.object,
};

export default ButtonLink;
