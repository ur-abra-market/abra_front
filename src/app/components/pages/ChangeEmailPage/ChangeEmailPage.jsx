import React, {useState} from 'react'
import Modal from '../../common/Modal'
import {Button} from '../../common/buttons'
import styleBtn from '../../common/buttons/buttons.module.css'
import style from './ChangeEmailPage.module.css'
import {useNavigate} from 'react-router-dom'
import HeaderForChangePages from '../../common/HeaderForChangePages'
import FooterForSupplierPart from '../../common/FooterForChangePages'
import ChangeEmailForm from '../../ui/ChangeEmailForm'

const ChangeEmailPage = () => {

    const navigate = useNavigate()
    const [modalActive, setModalActive] = useState(false)
    const handleChangeModalActive = () => {
        setModalActive((prevState) => !prevState)
    }

    return (
        <>
            <HeaderForChangePages/>

            <div className={style.page}>
                <div className={style.pageWrap}>
                    <div className={style.header}>
                        Change email
                    </div>
                    <div className={style.subheader}>
                        Enter your current and new email addresses
                    </div>
                    <div className={style.innerWrapper}>
                        <ChangeEmailForm handleChangeModalActive={handleChangeModalActive}/>
                    </div>
                </div>
            </div>

            <FooterForSupplierPart/>

            <Modal active={modalActive}>
                <div className={style.modalContentWrapper}>
                    <div className={style.modalHeader}>
                        Your new email has been successfully saved
                    </div>
                    <Button
                        value="Okay"
                        className={styleBtn.modalWindewBtnActive}
                        onClick={() => navigate('/')}
                    />
                </div>
            </Modal>
        </>
    )
}
export default ChangeEmailPage
