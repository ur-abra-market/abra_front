import React, { useState } from "react";
import style from "./forgotPasswordPage.module.css";
import ForgotPasswordForm from "../../ui/forgotPasswordForm";
import ContentMessage from "../../common/contentMessage";

const ForgotPasswordPage = () => {
  const [pageType, setPageType] = useState("forgotPassword");

  const togglePageType = () => {
    setPageType((prevState) =>
      prevState === "forgotPassword" ? "recoveryEmailIsSent" : "forgotPassword"
    );
  };

  return (
    <>
      <div className={style.pageWrap}>
        {pageType === "forgotPassword" ? (
          <>
            <ContentMessage
              title="Forgot the password?"
              text="Enter your email address to receive a link to reset your password"
            />
            <div className={style.innerWrapper}>
              <ForgotPasswordForm togglePageType={togglePageType} />
            </div>
          </>
        ) : (
          <>
            <div className={style.header}>
              <p>A link to reset your password</p>
              <p>has been sent to your email address.</p>
            </div>
            <div className={style.subheader}>
              <p>
                Make sure the email you received is indeed from Abra platform
              </p>
              <p>and follow the link to create a new password.</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ForgotPasswordPage;
