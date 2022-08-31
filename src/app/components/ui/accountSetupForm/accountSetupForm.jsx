import TextFieldLabelAbove from "../../common/textFieldLabelAbove";
import SelectLabelAbove from "../../common/selectLabelAbove";
import ButtonReg from "../../common/buttons/buttonReg";
import Form from "../../common/form";
import FormTitle from "../../common/formTitle";
import style from "./accountSetupForm.module.css";

const AccountSetupForm = () => {


    
    return (
        <div className={style.formWrapper}>
            <div className={style.formContainer}>
                <FormTitle
                    title={'Account Info'}
                    text={'This information will not be published. The data will only be used to create your account'}
                />

                <Form action="">

                    <div className={style.addName}>

                        <TextFieldLabelAbove
                            title={'First name'}
                            name={'fname'}
                            type={'text'}
                            placeholder={'John'}
                            error={'Please add text'} />
                        <TextFieldLabelAbove
                            title={'Last name'}
                            name={'lname'}
                            type={'text'}
                            placeholder={'Johnson'}
                            error={'Please add text'} />

                    </div>

                    <SelectLabelAbove
                        name={'country'}
                        title={'Country of company registration'}
                        placeholder={'Select'}
                        options={['USA', 'Germany', 'Brazil', 'France']}
                        error={'Please add text'} />

                    <div className={style.phoneNumber}>
                        <SelectLabelAbove
                            name={'countryCode'}
                            title={'Personal phone number'}
                            options={['+90', '+44', '+77', '+1']}
                        />

                        <div className={style.marginFix}>
                            <TextFieldLabelAbove
                                name={'tel'}
                                type={'tel'}
                                placeholder={'(XXX) XXX - XX - XX'}
                                error={'Please add text'} />
                        </div>

                    </div>

                    <TextFieldLabelAbove
                        title={'License or entrepreneur number'}
                        name={'license'}
                        type={'number'}
                        placeholder={'000 – 00 – 0000'}
                        error={'Please add text'} />

                    <p className={style.licenseReminder}>
                        Use the number of any document authorizing the sale
                    </p>

                    <ButtonReg type={'submit'}
                        value={'Continue'}
                        isValid={true} />
                </Form>

            </div>

        </div>
    );
};

export default AccountSetupForm;