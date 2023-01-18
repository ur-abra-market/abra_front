import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  addProductService,
  uploadImageService,
} from '../../../store/reducers/supplierSlice';
import ButtonReg from '../../common/buttons/buttonReg';
import DropDownField from '../../common/DropDownField';
import Form from '../../common/Form';
import FormTitle from '../../common/FormTitle';
import { ImagesAdding } from '../../common/ImageAdding/ImagesAdding';
import Loader from '../../common/Loader';
import SelectLabelAbove from '../../common/SelectLabelAbove';
import TextFieldLabelAbove from '../../common/TextFieldLabelAbove';
import MaterialInputs from '../MaterialInputs';
import ProdInfoInputs from '../ProdInfoInputs';
import SelectionsForProperties from '../SelectionsForProperties/SelectionsForProperties';
import TypesPage from '../TypesView/TypesPage';

import style from './ProductListRegistrationForm.module.css';

const ProductListRegistrationForm = ({
  firstCategory,
  secondCategory,
  thirdCategory,
  setSecondCategory,
  setFirstCategory,
  setThirdCategory,
  firstStageCategories,
  thirdStageCategories,
  secondStageCategories,
  productProperties,
  productVariations,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId, loading } = useSelector(state => state.supplier);

  const companyInfo = useSelector(state => state.supplier.companyInfo);

  const [isSubmit, setIsSubmit] = useState(false);
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([{ id: 1, selected: true }]);

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: 'onChange' });

  const values = productProperties?.map(el => el.key);

  const createObjProperty = (el, obj) => {
    const optional_value = obj[`${el}(optional)`];
    const value = obj[el];
    let finalObj = {
      name: el,
      value,
    };

    if (optional_value) finalObj = { ...finalObj, optional_value };

    return finalObj;
  };

  const createObjVariation = (id, data) => {
    const childs = [];

    productVariations.size?.forEach(el => {
      if (data[`${id}-${el}`]) {
        childs.push({
          name: 'size',
          value: el,
          count: data[`${id}-${el}`],
        });
      }
    });

    return {
      name: 'color',
      value: data[`${id}-color`],
      childs,
    };
  };

  const onSubmit = data => {
    const keysData = Object.keys(data);

    const properties = [];

    values.forEach(el => {
      properties.push(createObjProperty(el, data));
    });

    const variations = [];

    types.forEach(el => {
      variations.push(createObjVariation(el.id, data));
    });

    const addedMaterialKeys = [];
    const addedMaterialValues = [];

    keysData.forEach(el => {
      if (el.slice(0, 3) === 'opt') addedMaterialKeys.push(el);

      if (el.slice(0, 4) === 'main') addedMaterialValues.push(el);
    });
    addedMaterialKeys.forEach((el, i) => {
      if (data[addedMaterialValues[i]] && data[el]) {
        properties.push({
          name: `material:${i}`,
          value: data[addedMaterialValues[i]],
          optional_value: data[el],
        });
      }
    });

    const prices = [
      {
        value: data.mainPrice,
        quantity: data.mainQuantity,
      },
    ];

    if (data.specPrice && data.specQuantity) {
      prices.push({
        value: data.specPrice,
        quantity: data.specQuantity,
      });
    }

    const productInfo = {
      product_info: {
        product_name: data.prodName,
        category_id: categoryId,
        description: data.textarea,
      },
      properties,
      variations,
      prices,
    };

    dispatch(addProductService({ product: productInfo }));
    setIsSubmit(true);
    reset();
  };

  const variations = productVariations || {};

  useEffect(() => {
    if (productId && isSubmit) {
      images.forEach((el, i) => {
        dispatch(
          uploadImageService({
            rest: {
              img: el,
              index: i,
              prodId: productId,
            },
          }),
        );
      });

      navigate('/');
    }
  }, [productId]);

  return (
    <div className={style.formWrapper}>
      <div className={style.formContainer}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <FormTitle
              step={companyInfo?.name ? '' : 'Step 3/3'}
              link={companyInfo?.name ? 'Back' : 'Skip and Get started'}
              title="Product list"
              text="Enter the information about your first product"
            />
            <Form
              action="src/components/ui/ProductListRegistrationForm/ProductListRegistrationForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={style.form}>
                <DropDownField isShow title="Main Product Info">
                  <TextFieldLabelAbove
                    register={register('prodName', {
                      required: 'Field is required',
                    })}
                    error={errors?.prodName?.message}
                    title="Product name *"
                    name="prodName"
                    type="text"
                    placeholder="Enter the product name"
                  />

                  <div className={style.selectInputs}>
                    <div className={style.selectEqual}>
                      <SelectLabelAbove
                        value={firstCategory}
                        onChangeOption={setFirstCategory}
                        options={firstStageCategories}
                        register={register('category', {
                          required: true,
                        })}
                        title="Category *"
                        name="category"
                        placeholder="Select"
                      />
                    </div>

                    <div className={style.selectEqual}>
                      <SelectLabelAbove
                        value={secondCategory}
                        onChangeOption={setSecondCategory}
                        options={secondStageCategories}
                        register={register('type1', {})}
                        title="Type 1 *"
                        name="type1"
                        placeholder="Select"
                      />
                    </div>

                    {thirdStageCategories && !!thirdStageCategories.length && (
                      <div className={style.selectEqual}>
                        <SelectLabelAbove
                          value={thirdCategory}
                          onChangeOption={setThirdCategory}
                          options={thirdStageCategories}
                          register={register('type2')}
                          title="Type 2 *"
                          name="type2"
                          placeholder="Select"
                        />
                      </div>
                    )}
                  </div>

                  <p className={style.listImgTitle}>Photo of the company or production</p>

                  <div className={style.listImg}>
                    {[...new Array(5)].map((el, i) => (
                      <ImagesAdding key={i} images={images} setImages={setImages} />
                    ))}
                  </div>

                  <TextFieldLabelAbove
                    register={register('textarea')}
                    title="Description"
                    name="textarea"
                    placeholder="Enter the description of your product"
                  />
                </DropDownField>

                <DropDownField
                  isShow={!!productProperties && !!productVariations}
                  title="Properties"
                >
                  {productProperties &&
                    productProperties.map((el, i) => {
                      const values = [...new Set(el.values.map(el => el.value))];

                      return (
                        <SelectionsForProperties
                          key={i}
                          element={el}
                          options={values}
                          register={register}
                          placeholder="Select"
                        />
                      );
                    })}

                  <MaterialInputs
                    register={register}
                    mainTitle="Material (optional)"
                    optTitle="% (optional)"
                    mainPlaceholder="Enter the material name"
                    optPlaceholder="Enter percentage of material"
                    mainType="text"
                    optType="number"
                  />

                  <TypesPage
                    variations={variations}
                    register={register}
                    setTypes={setTypes}
                    types={types}
                    getValues={getValues}
                  />
                </DropDownField>

                <DropDownField
                  isShow={!!productProperties && !!productVariations}
                  title="Additional Product Info"
                >
                  <ProdInfoInputs register={register} />
                </DropDownField>

                <ButtonReg type="submit" value="Continue" isValid={!isValid} />
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

ProductListRegistrationForm.propTypes = {
  firstCategory: PropTypes.string,
  secondCategory: PropTypes.string,
  thirdCategory: PropTypes.string,
  setSecondCategory: PropTypes.func,
  setFirstCategory: PropTypes.func,
  setThirdCategory: PropTypes.func,
  firstStageCategories: PropTypes.array,
  thirdStageCategories: PropTypes.array,
  secondStageCategories: PropTypes.array,
  productProperties: PropTypes.array,
  productVariations: PropTypes.object,
  categoryId: PropTypes.number,
};

export default ProductListRegistrationForm;
