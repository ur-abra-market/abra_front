import { useForm } from "react-hook-form";
import ButtonReg from "../../common/buttons/buttonReg";
import DropDownField from "../../common/dropDownField";
import Form from "../../common/form";
import FormTitle from "../../common/formTitle";
import ImageAdding from "../../common/imageAdding";
import SelectLabelAbove from "../../common/selectLabelAbove";
import TextFieldLabelAbove from "../../common/textFieldLabelAbove";
import RadiosFor from "../radiosFor";
import style from "./productListRegistrationForm.module.css";
import CheckboxFor from "../checkboxFor";
import MaterialInputs from "../materialInputs";
import ProdInfoInputs from "../prodInfoInputs";


const ProductListRegistrationForm = () => {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ mode: 'onChange' })

    const onSubmit = (data) => {
        console.log(data);
        reset()
    }

    const clothes = ['Cardigan', 'Dress', 'Hoodie', 'Jeans', 'Leggings', 'Longsleeve',
        'Shorts', 'Skirt', 'Suits', 'Sweater', 'Sweatshirt', 'T-Shirt', 'Trousers', 'Turtleneck']

    const colorAmount = ['no color', 'white', 'beige', 'sand', 'gray', 'black', 'metallic', 'bronze', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'lilac', 'purple']

    const growths = ['44-51', '63-67', '75-80', '87-92', '105-110', '117-122', '129-134', '141-146', '146-152', '158-164', '170-176', '182-188']

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']

    return (
        <div className={style.formWrapper}>
            <div className={style.formContainer}>
                <FormTitle
                    step={'Step 3/3'}
                    link={'Skip and Get started'}
                    title={'Product list'}
                    text={'Enter the information about your first product'}
                />
                <Form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.form}>
                        <DropDownField title={'Main Product Info'}>
                            <TextFieldLabelAbove
                                register={
                                    register('prodName', {
                                        required: 'Field is required'
                                    })}
                                error={errors?.fname?.message}
                                title={'Product name *'}
                                name={'prodName'}
                                type={'text'}
                                placeholder={'Enter the product name'} />
                            <div className={style.selectInputs}>
                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={
                                            register('category', {
                                                required: 'Field is required'
                                            })}
                                        error={errors?.businessSector?.message}
                                        title={'Category *'}
                                        name={'category'}
                                        options={['Clothes', 'Accessories']}
                                        placeholder={'Select'} />
                                </div>
                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={
                                            register('type', {
                                                required: 'Field is required'
                                            })}
                                        error={errors?.businessSector?.message}
                                        title={'Type *'}
                                        name={'type'}
                                        options={clothes}
                                        placeholder={'Select'} />
                                </div>
                            </div>
                            <p className={style.listImgTitle}>Photo of the company or production</p>
                            <div className={style.listImg}>
                                <ImageAdding />
                                <ImageAdding />
                                <ImageAdding />
                                <ImageAdding />
                                <ImageAdding />
                            </div>
                            <TextFieldLabelAbove
                                register={register('textarea')}
                                title={'Description'}
                                name={'textarea'}
                                placeholder={'Enter the description of your product'} />
                        </DropDownField>

                        <DropDownField title={'Properties'}>

                            <RadiosFor register={register('color')}
                                title={'Select color *'}
                                state={'no color'}
                                array={colorAmount}
                                name={'color'} />

                            <CheckboxFor
                                register={register}
                                title={'Size and Quantity *'}
                                array={sizes} />

                            <RadiosFor register={register('growth')}
                                title={'Growth, cm (optional)'}
                                state={''}
                                array={growths}
                                name={'growth'} />

                            <div className={style.selectInputs}>
                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={
                                            register('occasion', {
                                                required: 'Field is required'
                                            })}
                                        error={errors?.businessSector?.message}
                                        title={'Occasion *'}
                                        name={'occasion'}
                                        options={['Casual', 'Formal', 'Home', 'Sport']}
                                        placeholder={'Select'} />
                                </div>
                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={
                                            register('season')}
                                        title={'Season'}
                                        name={'season'}
                                        options={['Spring-Summer', 'Autumn-Winter']}
                                        placeholder={'Select'} />
                                </div>
                            </div>

                            <div className={style.selectInputs}>

                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={
                                            register('gender')}
                                        title={'Gender'}
                                        name={'gender'}
                                        options={['Men', 'Women', 'Unisex']}
                                        placeholder={'Select'} />
                                </div>

                                <TextFieldLabelAbove
                                    register={
                                        register('sku', {
                                            required: 'Field is required'
                                        })}
                                    error={errors?.storeName?.message}
                                    title={'SKU *'}
                                    name={'sku'}
                                    type={'text'}
                                    placeholder={'Enter the SKU'} />

                            </div>

                            <MaterialInputs
                                register={register}
                                mainTitle={'Material (optional)'}
                                optTitle={'% (optional)'}
                                mainPlaceholder={'Enter the material name'}
                                optPlaceholder={'Enter percentage of material'}
                                mainType={'text'}
                                optType={'number'}
                                fakeArr={[]}
                            />


                        </DropDownField>

                        <DropDownField title={'Additional Product Info'}>
                            
                        <ProdInfoInputs register={register}/>

                        </DropDownField>


                        <ButtonReg type={'submit'}
                            value={'Continue'}
                            isValid={!isValid} />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ProductListRegistrationForm;