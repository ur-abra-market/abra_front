import React  from "react";
import Button from "../../common/buttons/button";
import style from "./forgotPasswordForm.module.css";
import styleBtn from "../../common/buttons/buttons.module.css";
import TextField from "../../common/textField";
import { useForm } from "react-hook-form";

const ForgotPasswordPage = ({togglePageType}) => {
    const {
        register,
        formState: { isValid, errors },
        handleSubmit,
      } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        if (!isValid) return;
        console.log(data);
    };

    return (
        <>
        <form action="/" target="_self" onSubmit={handleSubmit(onSubmit)} className={style.forgotPasswordForm}>
            <TextField
                register={register("email", {
                required: "Email is required!",
                pattern: {
                    value: /^\S+@\S+\.\S+$/g,
                    message: "Email is incorrect!",
                },
                })}
                label="Email"
                name="email"
                error={errors.email}
            />
            <Button
                value="Reset password"
                className={
                !isValid
                    ? `${styleBtn.commonButton} ${styleBtn.logInBtnInactive}`
                    : `${styleBtn.commonButton} ${styleBtn.logInBtnActive}`
                }
                disabled={!isValid}
                onClick={togglePageType}
            />

        </form>
        </>
    )
}
export default ForgotPasswordPage;