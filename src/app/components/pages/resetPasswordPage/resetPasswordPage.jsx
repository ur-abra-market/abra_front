import React  from "react";
import style from "./resetPassword.module.css";
import ResetPasswordForm from "../../ui/resetPasswordForm";

const ResetPasswordPage = (params) => {
    return (
        <>
            <div className={style.pageWrap}>
                <div className={style.header}>Create new password</div>
                <div className={style.subheader}>Enter a new password that matches the criteria</div>
                <div className={style.innerWrapper}>
                    <ResetPasswordForm/>
                </div>
            </div>
        </>
    )
}
export default ResetPasswordPage;