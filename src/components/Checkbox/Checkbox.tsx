import React, { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';

interface CheckBoxProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  classes?: any;
  inputProps?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, classes, inputProps }, ref): JSX.Element => {
    return (
      <label className={classes.labelCheckbox}>
        {label}
        <input
          ref={ref}
          type="checkbox"
          className={classes.inputCheckbox}
          {...inputProps}
        />
      </label>
    );
  },
);

export default Checkbox;
