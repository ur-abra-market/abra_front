import React from "react";
import PropTypes from "prop-types";

const Button = ({value, className, onClick, disabled, active, ...attrs}) => {
    
    const classes = `${className} + ${active}`;
    const Tag = attrs.href ? 'a' : 'button';
    const onClickAction = (e) => {
        if (disabled) {
            e.preventDefault();
        }
        else onClick();
    };

    return (
    <Tag 
        {...attrs}
        className={classes}
        disabled={disabled}
        onClick={onClickAction}
    >{value}</Tag> 
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
    onClick: () => {},
    disabled: false,
    active: false,
}



export default Button;
