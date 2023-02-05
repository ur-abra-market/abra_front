import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

interface CheckBoxProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  classes?: any;
  inputProps?: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
const Checkbox: FC<CheckBoxProps> = ({ label, classes, inputProps }): JSX.Element => {
  return (
    <label className={classes.labelCheckbox}>
      {label}
      <input type="checkbox" className={classes.inputCheckbox} {...inputProps} />
    </label>
  );
};

export default Checkbox;
