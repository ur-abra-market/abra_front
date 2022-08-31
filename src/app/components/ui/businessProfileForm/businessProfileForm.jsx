import ButtonReg from "../../common/buttons/buttonReg";
import Form from "../../common/form";
import FormTitle from "../../common/formTitle";
import ImageAdding from "../../common/imageAdding";
import SelectLabelAbove from "../../common/selectLabelAbove";
import TextFieldLabelAbove from "../../common/textFieldLabelAbove";
import style from "./businessProfileForm.module.css";


const BusinessProfileForm = () => {
    return (
        <div className={style.formWrapper}>
            <div className={style.formContainer}>
                <FormTitle
                    title={'Business profile'}
                    text={'Enter the information you want to show on your store profile'}
                />

                <Form action="">
                    <div className={style.mainInfo}>

                        <p className={style.mainInfoTitle}>Main info</p>

                        <ImageAdding
                            label={'Add logo or profile image'}
                            placeholder={'The customers will recognize your store by this image'}
                        />

                        <div className={style.selectInfoInputs}>

                            <TextFieldLabelAbove
                                title={'Shop name (will be shown on the profile)'}
                                name={'storeName'}
                                type={'text'}
                                placeholder={'Enter your company or store name'}
                                error={'Please add text'} />

                            <div className={style.selectEqual}>
                                <SelectLabelAbove
                                    title={'Your main business sector'}
                                    name={'lname'}
                                    options={['1', '2', '3', '4', '5', '6']}
                                    placeholder={'Select'}
                                    error={'Please add text'} />
                            </div>

                        </div>

                        <div className={style.checkboxContainer}>
                            <input type="checkbox" id="checkbox"
                                className={style.checkbox} />
                            <label htmlFor="checkbox">I am a manufacturer</label>
                        </div>
                    </div>


                    <div className={style.companyInfo}>

                        <p className={style.mainInfoTitle}>Company Info (optional)</p>

                        <div className={style.selectInfoInputs}>

                            <TextFieldLabelAbove
                                title={'Year Established'}
                                name={'yearEstablished'}
                                type={'number'}
                                placeholder={'Enter the year'}
                                error={'Please add text'} />

                            <div className={style.selectEqual}>
                                <SelectLabelAbove
                                    title={'Number of employees'}
                                    name={'numEmployees'}
                                    options={['0', '<4', '<10', '>10']}
                                    placeholder={'Select'}
                                    error={'Please add text'} />
                            </div>

                        </div>


                        <TextFieldLabelAbove
                            title={'About the business'}
                            name={'textarea'}
                            placeholder={'Tell more about your company or business'}
                            error={'Please add text'} />


                        <p className={style.listImgTitle}>Photo of the company or production</p>
                        <div className={style.listImg}>
                            <ImageAdding />
                            <ImageAdding />
                            <ImageAdding />
                            <ImageAdding />
                            <ImageAdding />
                        </div>
                    </div>

                    <div className={style.contactsInfo}>

                        <p className={style.mainInfoTitle}>Contacts (optional)</p>

                        <div className={style.phoneNumber}>
                            <SelectLabelAbove
                                name={'countryCode'}
                                title={'Business phone number'}
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

                        <div className={style.contactsInputs}>
                            <TextFieldLabelAbove
                                title={'Business email address'}
                                name={'email'}
                                type={'email'}
                                placeholder={'business@email.com'}
                                error={'Please add text'} />
                            <TextFieldLabelAbove
                                title={'Main company address'}
                                name={'address'}
                                type={'text'}
                                placeholder={'Enter address'}
                                error={'Please add text'} />
                        </div>

                    </div>

                    <ButtonReg type={'submit'}
                        value={'Continue'}
                        isValid={true} />
                </Form>

            </div>

        </div>
    );
};

export default BusinessProfileForm;