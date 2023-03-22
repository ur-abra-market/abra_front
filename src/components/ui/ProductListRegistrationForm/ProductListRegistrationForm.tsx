import React, { FC, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addProductService,
  getCompanyInfoService,
  uploadImageService,
} from '../../../store/reducers/supplierSlice';
import DropDownField from '../../DropDownField';
import Form from '../../Form';
import FormTitle from '../../FormTitle';
import { ImagesAdding } from '../../ImageAdding/ImagesAdding';
// import Loader from '../../Loader';
import { Button, Input, Label, Select } from '../../ui-kit';
import { IOption } from '../../ui-kit/Select/Select.props';
import MaterialInputs from '../MaterialInputs';
import ProdInfoInputs from '../ProdInfoInputs';
import SelectionsForProperties from '../SelectionsForProperties/SelectionsForProperties';
import TypesPage from '../TypesView/TypesPage';

import style from './ProductListRegistrationForm.module.css';

// import { Status } from 'enums/status.enum';

interface ProductProperties {
  key: string;
  values: Array<PropertiesValues>;
}

interface PropertiesValues {
  value: string;
  optional_value: string | null;
}

export interface ProductVariations {
  Color: string[];
  Size: string[];
}

const schema = yup.object({
  prodName: yup.string().required('Field is required'),
  businessSector: yup.string().required('Field is required'),
  tel: yup.string().required('Field is required'),
  yearEstablished: yup
    .string()
    .min(4, 'Add an existing year')
    .max(5, "this year hasn't come yet"),
  email: yup.string().email('Invalid email address'),
  category: yup.string().required('Field is required'),
  type1: yup.string().required('Field is required'),
  type2: yup.string().required('Field is required'),
});

interface ProductData {
  prodName: string;
  textarea: string;
  category: string;
  type1: string;
  type2: string;
}

interface ProductListRegistrationFormProps {
  firstCategory: string;
  secondCategory: string;
  thirdCategory: string;
  setSecondCategory: (value: string) => void;
  setFirstCategory: (value: string) => void;
  setThirdCategory: (value: string) => void;
  firstStageCategories: string[];
  thirdStageCategories: string[];
  secondStageCategories: string[];
  productProperties?: ProductProperties[] | null;
  productVariations: ProductVariations | null;
  categoryId?: number;
}
const ProductListRegistrationForm: FC<ProductListRegistrationFormProps> = ({
  setSecondCategory,
  setFirstCategory,
  setThirdCategory,
  firstStageCategories,
  thirdStageCategories,
  secondStageCategories,
  productProperties,
  productVariations,
  categoryId,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId, companyInfo } = useAppSelector(state => state.supplier);

  const [isSubmit, setIsSubmit] = useState(false);
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([{ id: 1, selected: true }]);
  const [showMainProductInfo, setShowMainProductInfo] = useState(true);

  const FIRST_CATEGORIES_DATA: IOption[] = firstStageCategories?.map(el => {
    return { label: el, value: el };
  });
  const SECOND_CATEGORIES_DATA: IOption[] = secondStageCategories?.map(el => {
    return { label: el, value: el };
  });
  const THIRD_CATEGORIES_DATA: IOption[] = thirdStageCategories?.map(el => {
    return { label: el, value: el };
  });

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<ProductData>({ resolver: yupResolver(schema), mode: 'onChange' });

  const values = productProperties?.map(el => el.key);

  const createObjProperty = (el: any, obj: any): any => {
    const optional_value = obj[`${el}(optional)`];
    const value = obj[el];
    let finalObj = {
      name: el,
      value,
    };

    if (optional_value) {
      // @ts-ignore
      finalObj = { ...finalObj, optional_value };
    }

    return finalObj;
  };

  const createObjVariation = (id: any, data: any): any => {
    const childs: any[] = [];

    productVariations?.Size?.forEach((el: any) => {
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

  const onSubmit = (data: any): void => {
    const keysData = Object.keys(data);

    const properties: any[] = [];

    values?.forEach(el => {
      properties.push(createObjProperty(el, data));
    });

    const variations: any[] = [];

    types.forEach(el => {
      variations.push(createObjVariation(el.id, data));
    });

    const addedMaterialKeys: any[] = [];
    const addedMaterialValues: any[] = [];

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
  }, [dispatch, images, isSubmit, navigate, productId]);

  useEffect(() => {
    dispatch(getCompanyInfoService());
  }, [dispatch]);

  // @ts-ignore
  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        {/* {loading === Status.Loading ? ( */}
        {/*   <Loader /> */}
        {/* ) : ( */}
        <FormTitle
          // @ts-ignore
          step={companyInfo?.name ? '' : 'Step 3/3'}
          // @ts-ignore
          link={companyInfo?.name ? 'Back' : 'Skip and Get started'}
          title="Product list"
          text="Enter the information about your first product"
        />
        <Form
          action="src/components/ui/ProductListRegistrationForm/ProductListRegistrationForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={style.form}>
            <DropDownField
              title="Main Product Info"
              isShow={showMainProductInfo}
              foo={setShowMainProductInfo}
            >
              <Label label="Product name *">
                <Input
                  {...register('prodName')}
                  error={errors?.prodName?.message}
                  placeholder="Enter the product name"
                />
              </Label>
              <div className={style.select_inputs}>
                <div className={style.select_equal}>
                  <Label label="Category *">
                    <Select
                      {...register('category')}
                      error={errors?.category?.message}
                      placeholder="Select"
                      onChangeOption={setFirstCategory}
                      options={FIRST_CATEGORIES_DATA}
                    />
                  </Label>
                </div>

                <div className={style.select_equal}>
                  <Label label="Type 1 *">
                    <Select
                      {...register('type1')}
                      error={errors?.type1?.message}
                      placeholder="Select"
                      onChangeOption={setSecondCategory}
                      options={SECOND_CATEGORIES_DATA}
                    />
                  </Label>
                </div>

                {thirdStageCategories && !!thirdStageCategories.length && (
                  <div className={style.select_equal}>
                    <Label label="Type 2 *">
                      <Select
                        {...register('type2')}
                        error={errors?.type2?.message}
                        placeholder="Select"
                        onChangeOption={setThirdCategory}
                        options={THIRD_CATEGORIES_DATA}
                      />
                    </Label>
                  </div>
                )}
              </div>

              <p className={style.list_img_title}>Photo of the company or production</p>

              <div className={style.list_img}>
                {[...new Array(5)].map((el, i) => (
                  <ImagesAdding key={i} images={images} setImages={setImages} />
                ))}
              </div>
              <Label label="Description">
                <Input
                  {...register('textarea')}
                  placeholder="Enter the description of your product"
                />
              </Label>
            </DropDownField>

            <DropDownField
              isShow={!!productProperties && !!productVariations}
              title="Properties"
            >
              {productProperties &&
                productProperties.map((el: ProductProperties, i) => {
                  // @ts-ignore
                  const values = [
                    ...new Set(el.values.map((el: PropertiesValues) => el.value)),
                  ];

                  const options: IOption[] = values.map((el: any) => {
                    return { label: el, value: el };
                  });

                  return (
                    <SelectionsForProperties
                      key={i}
                      element={el}
                      options={options}
                      register={register}
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
                variations={variations as ProductVariations}
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

            <Button type="submit" label="Continue" disabled={!isValid} />
          </div>
        </Form>
        )
      </div>
    </div>
  );
};

export default ProductListRegistrationForm;
