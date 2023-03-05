import React, { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react'

import style from './ImmutableTextFieldWithChangeButton.module.css'

interface ImmutableTextFieldWithChangeButtonProps {
  label?: string
  name?: string
  id?: string
  type?: 'email' | 'text' | 'password'
  placeholder?: string
  classes?: any
  defaultValue?: string
  inputProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}
const ImmutableTextFieldWithChangeButton: FC<
  ImmutableTextFieldWithChangeButtonProps
> = (props): JSX.Element => {
  const {
    label,
    id,
    type = 'text',
    name,
    placeholder,
    classes,
    inputProps,
    defaultValue
  } = props

  const [edit, setEdit] = useState<boolean>(false)

  return (
    <>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <div className={classes.inputWrapper}>
        <input
          type={type}
          id={id}
          value={defaultValue}
          className={
            // eslint-disable-next-line no-nested-ternary
            !(name === 'password')
              ? classes.input
              : classes.password
              ? classes.password.inputTextFieldPassword
              : style.input_text_field_password
          }
          // className={cn()}
          placeholder={placeholder}
          disabled={!edit}
          {...inputProps}
        />
        <div className={classes.changeBtnWrapper}>
          <button
            type="button"
            className={classes.changeBtn}
            onClick={() => setEdit(!edit)}
          >
            Change
          </button>
        </div>
      </div>
    </>
  )
}

export default ImmutableTextFieldWithChangeButton
