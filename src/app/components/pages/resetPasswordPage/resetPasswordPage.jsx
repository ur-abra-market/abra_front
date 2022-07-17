import React, {useState}  from "react";
import style from "./resetPassword.module.css";
import ResetPasswordForm from "../../ui/resetPasswordForm";
import Modal from "../../common/modal/modal";
import Button from "../../common/buttons/button";
import styleBtn from "../../common/buttons/buttons.module.css";

const ResetPasswordPage = (params) => {

    const [modalActive, setModalActive] = useState(true);

    return (
        <>
            <div className={style.pageWrap}>
                <div className={style.header}>Create new password</div>
                <div className={style.subheader}>Enter a new password that matches the criteria</div>
                <div className={style.innerWrapper}>
                    <ResetPasswordForm/>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={style.modalContentWrapper}>
                    <div className={style.modalHeader}>Your new password has been successfully saved</div>
                    <div className={style.modalSubHeader}>Now you can log in with your new password</div>
                    <Button
                        value="Okay"
                        className={styleBtn.modalWindewBtnActive}
                        onClick={()=> setModalActive(false)}
                    />
                </div>
            </Modal>
        </>
    )
};
export default ResetPasswordPage;