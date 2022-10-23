import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentMessage from "../../common/contentMessage";
import style from "./confirmEmailPage.module.css";
import { registerService } from "../../../store/reducers/registerSlice";
import { useEffect } from "react";

const ConfirmEmailPage = () => {
  const dispatch = useDispatch();
  const resServer = useSelector((state) => state.register.resMessage);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      dispatch(registerService({ route: "email_confirmation_result", token }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (resServer === "REGISTRATION_SUCCESSFUL") {
      navigate("/", { replace: true });
    }
  }, [resServer]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <ContentMessage
          title="A link for sign up has been sent to your email address."
          text="Make sure the email you received is indeed from Abra platform and follow the link to create a new password."
        />
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
