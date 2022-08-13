import ContentMessage from "../../common/contentMessage";
import style from "./confirmEmail.module.css"


const ConfirmEmail = () => {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <ContentMessage
                title="A link for sign up has been sent to your email address."
                text="Make sure the email you received is indeed from Abra platform and follow the link to create a new password." />
            </div>
        </div>
    );
};

export default ConfirmEmail;