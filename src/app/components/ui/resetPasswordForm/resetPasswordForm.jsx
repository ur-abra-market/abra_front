import React from "react";
import PropTypes from "prop-types";
import Button from "../../common/buttons";
import style from "./resetPasswordForm.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";
import { useForm } from "react-hook-form";
import TextField from "../../common/textField";
import PasswordComplexity from "../../common/passwordComplexity/passwordComplexity";
import Form from "../../common/form/form";

const ResetPasswordForm = ({ handleChangeModalActive }) => {
  const {
    register,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const watchPasword = watch("password");
  const onSubmit = (data) => {
    if (!isValid) return;
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={style.resetPasswordForm}>
      <TextField
        register={register("password", {
          required: "Password is required!",
          minLength: {
            value: 8,
            message: "Password must contain at least 8 characters!",
          },
          validate: {
            capitalSymbol: (s) => /[A-Z]+/g.test(s),
            digitSymbol: (s) => /\d+/g.test(s),
            specialSymbol: (s) => /[!#+*]/g.test(s),
          },
        })}
        label="Password"
        type="password"
        id="password"
        name="password"
      />
      <PasswordComplexity valueOfNewPassword={watchPasword} />
      <Button
        value="Save"
        className={
          !isValid
            ? `${styleBtn.commonButton} ${styleBtn.logInBtnInactive}`
            : `${styleBtn.commonButton} ${styleBtn.logInBtnActive}`
        }
        disabled={!isValid}
        onClick={handleChangeModalActive}
      />
    </Form>
  );
};

ResetPasswordForm.propTypes = {
  handleChangeModalActive: PropTypes.func,
};
export default ResetPasswordForm;
