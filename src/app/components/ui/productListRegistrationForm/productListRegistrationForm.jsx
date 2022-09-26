import {useForm} from "react-hook-form";
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
import {generateKey} from "../../../utils/generateKey";


const ProductListRegistrationForm = ({
                                         firstCategory,
                                         secondCategory,
                                         thirdCategory,
                                         setSecondCategory,
                                         setFirstCategory,
                                         setThirdCategory,
                                         firstStageCategories,
                                         thirdStageCategories,
                                         secondStageCategories
                                     }) => {

    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset,
    } = useForm({mode: 'onChange'})

    const onSubmit = (data) => {
        console.log(data);
        reset()
    }

    /*const clothes = ['Cardigan', 'Dress', 'Hoodie', 'Jeans', 'Leggings', 'Longsleeve',
        'Shorts', 'Skirt', 'Suits', 'Sweater', 'Sweatshirt', 'T-Shirt', 'Trousers', 'Turtleneck']*/

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
                                error={errors?.prodName?.message}
                                title={'Product name *'}
                                name={'prodName'}
                                type={'text'}
                                placeholder={'Enter the product name'}
                            />

                            <div className={style.selectInputs}>

                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        value={firstCategory}
                                        onChangeOption={setFirstCategory}
                                        options={firstStageCategories}
                                        register={
                                            register('category', {
                                                required: true
                                            })}
                                        title={'Category *'}
                                        name={'category'}
                                        placeholder={'Select'}/>
                                </div>

                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        value={secondCategory}
                                        onChangeOption={setSecondCategory}
                                        options={secondStageCategories}
                                        register={
                                            register('type1', {
                                                required: true
                                            })}
                                        title={'Type 1 *'}
                                        name={'type'}
                                        placeholder={'Select'}
                                    />
                                </div>

                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        value={thirdCategory}
                                        onChangeOption={setThirdCategory}
                                        options={thirdStageCategories}
                                        register={
                                            register('type2', {
                                                required: false
                                            })}
                                        title={'Type 2'}
                                        name={'type'}
                                        placeholder={'Select'}
                                    />
                                </div>

                            </div>

                            <p className={style.listImgTitle}>Photo of the company or
                                production</p>

                            <div className={style.listImg}>
                                {[...new Array(5)].map((el, i) => (
                                    <div key={generateKey(i)}>
                                        <ImageAdding/>
                                    </div>
                                ))}
                            </div>

                            <TextFieldLabelAbove
                                register={register('textarea')}
                                title={'Description'}
                                name={'textarea'}
                                placeholder={'Enter the description of your product'}/>
                        </DropDownField>

                        <DropDownField title={'Properties'}>

                            <div className={style.selectInputs}>
                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={
                                            register('occasion', {
                                                required: true
                                            })}
                                        title={'Occasion *'}
                                        name={'occasion'}
                                        options={['Casual', 'Formal', 'Home', 'Sport']}
                                        placeholder={'Select'}/>
                                </div>
                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={register('season')}
                                        title={'Season'}
                                        name={'season'}
                                        options={['Spring-Summer', 'Autumn-Winter']}
                                        placeholder={'Select'}/>
                                </div>
                            </div>

                            <div className={style.selectInputs}>

                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={
                                            register('sizesGrid', {
                                                required: true
                                            })}
                                        title={'Sizes grid type *'}
                                        name={'sizesGrid'}
                                        options={['12', '23', '34', '45']}
                                        placeholder={'Select'}/>
                                </div>

                                <div className={style.selectEqual}>
                                    <SelectLabelAbove
                                        register={register('gender')}
                                        title={'Gender'}
                                        name={'gender'}
                                        options={['Men', 'Women', 'Unisex']}
                                        placeholder={'Select'}/>
                                </div>

                            </div>

                            <MaterialInputs
                                register={register}
                                mainTitle={'Material (optional)'}
                                optTitle={'% (optional)'}
                                mainPlaceholder={'Enter the material name'}
                                optPlaceholder={'Enter percentage of material'}
                                mainType={'text'}
                                optType={'number'}
                            />
                            <RadiosFor register={register('color', {required: true})}
                                       title={'Select color *'}
                                       state={'no color'}
                                       array={colorAmount}
                                       name={'color'}/>

                            <CheckboxFor
                                register={register}
                                title={'Size and Quantity *'}
                                array={sizes}/>

                            <RadiosFor register={register('growth')}
                                       title={'Growth, cm (optional)'}
                                       state={''}
                                       array={growths}
                                       name={'growth'}/>

                        </DropDownField>

                        <DropDownField title={'Additional Product Info'}>

                            <ProdInfoInputs register={register}/>

                        </DropDownField>


                        <ButtonReg type={'submit'}
                                   value={'Continue'}
                                   isValid={!isValid}/>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ProductListRegistrationForm;