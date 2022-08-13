import style from './contentMessage.module.css'

const ContentMessage = ({ title, text }) => {

    return (
        <>
            <div className={style.header}>{title}</div>
            <div className={style.subheader}>{text}</div>
        </>
    );
};

export default ContentMessage;