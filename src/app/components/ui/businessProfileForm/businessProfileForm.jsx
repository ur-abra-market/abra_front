import { useForm } from "react-hook-form";
import ButtonReg from "../../common/buttons/buttonReg";
import Form from "../../common/form";
import FormTitle from "../../common/formTitle";
import ImageAdding from "../../common/imageAdding";
import SelectLabelAbove from "../../common/selectLabelAbove";
import TextFieldLabelAbove from "../../common/textFieldLabelAbove";
import style from "./businessProfileForm.module.css";


const BusinessProfileForm = () => {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onChange' })

    const onSubmit = (data) => {
        reset()
    }

    return (
        <div className={style.formWrapper}>
            <div className={style.formContainer}>
                <FormTitle
                    step={'Step 2/3'}
                    title={'Business profile'}
                    text={'Enter the information you want to show on your store profile'}
                />

                <Form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.mainInfo}>

                        <p className={style.mainInfoTitle}>Main info</p>

                        <ImageAdding
                            label={'Add logo or profile image'}
                            placeholder={'The customers will recognize your store by this image'}
                            register={
                                register('profileLogo', {
                                    required: 'Field is required'
                                })}
                            error={errors?.profileLogo?.message}
                        />

                        <div className={style.selectInfoInputs}>

                            <TextFieldLabelAbove
                                register={
                                    register('storeName', {
                                        required: 'Field is required'
                                    })}
                                error={errors?.storeName?.message}
                                title={'Shop name (will be shown on the profile)'}
                                name={'storeName'}
                                type={'text'}
                                placeholder={'Enter your company or store name'} />

                            <div className={style.selectEqual}>
                                <SelectLabelAbove
                                    register={
                                        register('businessSector', {
                                            required: 'Field is required'
                                        })}
                                    error={errors?.businessSector?.message}
                                    title={'Your main business sector'}
                                    name={'businessSector'}
                                    options={['1', '2', '3', '4', '5', '6']}
                                    placeholder={'Select'} />
                            </div>

                        </div>

                        <div className={style.checkboxContainer}>
                            <input type="checkbox" id="checkbox"
                                className={style.checkbox}
                                {...register('checkbox')} />
                            <label htmlFor="checkbox">I am a manufacturer</label>
                        </div>
                    </div>


                    <div className={style.companyInfo}>

                        <p className={style.mainInfoTitle}>Company Info (optional)</p>

                        <div className={style.selectInfoInputs}>

                            <TextFieldLabelAbove
                                register={register('yearEstablished')}
                                title={'Year Established'}
                                name={'yearEstablished'}
                                type={'number'}
                                placeholder={'Enter the year'} />

                            <div className={style.selectEqual}>
                                <SelectLabelAbove
                                    register={register('numEmployees')}
                                    title={'Number of employees'}
                                    name={'numEmployees'}
                                    options={['0', '<4', '<10', '>10']}
                                    placeholder={'Select'} />
                            </div>

                        </div>


                        <TextFieldLabelAbove
                            register={register('textarea')}
                            title={'About the business'}
                            name={'textarea'}
                            placeholder={'Tell more about your company or business'} />


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
                                register={register('code')}
                                name={'countryCode'}
                                title={'Business phone number'}
                                options={['+90', '+44', '+77', '+1']}
                            />

                            <div className={style.marginFix}>
                                <TextFieldLabelAbove
                                    register={
                                        register('tel', {
                                            minLength: {
                                                value: 10,
                                                message: 'Phone number must be 10 digits',
                                            }
                                        })}
                                    error={errors?.tel?.message}
                                    name={'tel'}
                                    type={'tel'}
                                    placeholder={'(XXX) XXX - XX - XX'} />
                            </div>

                        </div>

                        <div className={style.contactsInputs}>
                            <TextFieldLabelAbove
                                register={
                                    register('email', {
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        }
                                    })}
                                error={errors?.email?.message}
                                title={'Business email address'}
                                name={'email'}
                                type={'email'}
                                placeholder={'business@email.com'} />

                            <TextFieldLabelAbove
                                register={register('address')}
                                title={'Main company address'}
                                name={'textarea'}
                                placeholder={'Enter address'} />
                        </div>

                    </div>

                    <ButtonReg type={'submit'}
                        value={'Continue'}
                        isValid={!isValid} />
                </Form>

            </div>

        </div>
    );
};

export default BusinessProfileForm;