import React from "react";
import PropTypes from "prop-types";

const Button = ({value, className, onClick, disabled, active, ...attrs}) => {
    
    const classes = `${className} + ${active}`;

    return (
    <button 
        {...attrs}
        className={classes}
        disabled={disabled}
        onClick={onClick}
        >{value}
    </button> 
    )
}

Button.propTypes={
    value: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
}

Button.defaultProps={
    value: 'Default Button',
    className: '',
    disabled: false,
    active: false,
}



export default Button;
