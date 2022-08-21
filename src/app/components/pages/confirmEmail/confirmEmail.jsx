import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentMessage from "../../common/contentMessage";
import style from "./confirmEmail.module.css"
import { registerService } from "../../../store/reducers/registerSlice";
import { useEffect } from "react";


const ConfirmEmail = () => {
    const dispatch = useDispatch()
    const resServer = useSelector((state) => state.register.resMessage)

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get("token")

    useEffect(() => {
        if (searchParams.get("token")) {
            dispatch(registerService({ userStatus: 'email-confirmation-result', token }))
        }
    }, [searchParams, dispatch, token])

    useEffect(() => {
        const goMainPage = () => navigate('/', { replace: true })
        if (resServer === 'REGISTRATION_SUCCESSFUL') {
            goMainPage()
        }
    }, [resServer, navigate])

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