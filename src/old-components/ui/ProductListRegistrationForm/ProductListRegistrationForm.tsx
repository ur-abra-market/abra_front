import React, { FC, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../../common/hooks';
import { UploadImage } from '../../../components';
import { HOME } from '../../../routes';
import {
  addProductService,
  getCompanyInfoService,
  uploadImageService,
} from '../../../store/reducers/supplier/other';
import {
  Button,
  Input,
  ISelectOption,
  Label,
  LoaderCircular,
  Select,
} from '../../../ui-kit';
import DropDownField from '../../DropDownField';
import Form from '../../Form';
import ProdInfoInputs from '../ProdInfoInputs';
import SelectionsForProperties from '../SelectionsForProperties/SelectionsForProperties';
import TypesPage from '../TypesView/TypesPage';

import style from './ProductListRegistrationForm.module.css';

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
  setSecondCategory: (value: string) => void;
  setFirstCategory: (value: string) => void;
  setThirdCategory: (value: string) => void;
  firstStageCategories: string[];
  thirdStageCategories: string[];
  secondStageCategories: string[];
  productProperties: ProductProperties[] | null;
  productVariations: ProductVariations | null;
  categoryId: number;
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
  const { productId, loading } = useAppSelector(state => state.supplierOther);

  const [isSubmit, setIsSubmit] = useState(false);
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([{ id: 1, selected: true }]);

  const [openDropDownField, setOpenDropDownField] = useState<null | number>(null);

  const FIRST_CATEGORIES_DATA: ISelectOption[] = firstStageCategories?.map(el => {
    return { label: el, value: el };
  });
  const SECOND_CATEGORIES_DATA: ISelectOption[] = secondStageCategories?.map(el => {
    return { label: el, value: el };
  });
  const THIRD_CATEGORIES_DATA: ISelectOption[] = thirdStageCategories?.map(el => {
    return { label: el, value: el };
  });

  const {
    control,
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

  const createObjVariation = (id: number, data: any): any => {
    const childs: any[] = [];

    productVariations?.Size?.forEach((el: any) => {
      if (data[`${id}-${el}`]) {
        childs.push({
          name: 'size',
          value: el,
          count: Number(data[`${id}-${el}`]),
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
        value: Number(data.mainPrice),
        quantity: Number(data.mainQuantity),
      },
    ];

    if (data.specPrice && data.specQuantity) {
      prices.push({
        value: Number(data.specPrice),
        quantity: Number(data.specQuantity),
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

      navigate(HOME);
    }
  }, [dispatch, images, isSubmit, navigate, productId]);

  useEffect(() => {
    dispatch(getCompanyInfoService());
  }, [dispatch]);

  const handleSetCategory = (
    value: string,
    onChangeCallback: (value: string) => void,
  ): void => {
    onChangeCallback(value);
  };

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        {loading === 'loading' ? (
          <LoaderCircular />
        ) : (
          <Form
            action="src/old-components/ui/ProductListRegistrationForm/ProductListRegistrationForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={style.form}>
              <DropDownField
                title="Main Product Info"
                id={1}
                open={openDropDownField}
                setOpen={setOpenDropDownField}
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
                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <Label label="Category *">
                          <Select
                            options={FIRST_CATEGORIES_DATA}
                            placeholder="Select"
                            padding="23px"
                            className={style.select}
                            error={errors?.category?.message}
                            onChange={value => {
                              field.onChange(value.value);
                              handleSetCategory(value.label, setFirstCategory);
                            }}
                          />
                        </Label>
                      )}
                    />
                  </div>

                  <div className={style.select_equal}>
                    <Controller
                      control={control}
                      name="type1"
                      render={({ field }) => (
                        <Label label="Type 1 *">
                          <Select
                            options={SECOND_CATEGORIES_DATA}
                            placeholder="Select"
                            error={errors?.type1?.message}
                            padding="23px"
                            className={style.select}
                            onChange={value => {
                              field.onChange(value.value);
                              handleSetCategory(value.label, setSecondCategory);
                            }}
                          />
                        </Label>
                      )}
                    />
                  </div>

                  {thirdStageCategories && !!thirdStageCategories.length && (
                    <div className={style.select_equal}>
                      <Controller
                        control={control}
                        name="type2"
                        render={({ field }) => (
                          <Label label="Type 2 *">
                            <Select
                              options={THIRD_CATEGORIES_DATA}
                              placeholder="Select"
                              error={errors?.type2?.message}
                              className={style.select}
                              onChange={value => {
                                field.onChange(value.value);
                                handleSetCategory(value.label, setThirdCategory);
                              }}
                            />
                          </Label>
                        )}
                      />
                    </div>
                  )}
                </div>

                <p className={style.list_img_title}>Photo of the company or production</p>

                <div className={style.list_img}>
                  {[...new Array(5)].map((el, i) => (
                    <UploadImage action="" type="default" key={i} />
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
                id={2}
                title="Properties"
                open={openDropDownField}
                setOpen={setOpenDropDownField}
              >
                {productProperties &&
                  productProperties.map((el: ProductProperties, i) => {
                    // @ts-ignore
                    const values = [
                      ...new Set(el.values.map((el: PropertiesValues) => el.value)),
                    ];

                    const options: ISelectOption[] = values.map((el: any) => {
                      return { label: el, value: el };
                    });

                    return (
                      <SelectionsForProperties
                        key={i}
                        element={el}
                        options={options}
                        control={control}
                      />
                    );
                  })}

                {/* <MaterialInputs
                    register={register}
                    mainTitle="Material (optional)"
                    optTitle="% (optional)"
                    mainPlaceholder="Enter the material name"
                    optPlaceholder="Enter percentage of material"
                    mainType="text"
                    optType="number"
                  /> */}

                <TypesPage
                  variations={variations as ProductVariations}
                  register={register}
                  setTypes={setTypes}
                  types={types}
                  getValues={getValues}
                />
              </DropDownField>
              <DropDownField
                id={3}
                title="Additional Product Info"
                open={openDropDownField}
                setOpen={setOpenDropDownField}
              >
                <ProdInfoInputs register={register} />
              </DropDownField>
              <Button type="submit" label="Continue" disabled={!isValid} />
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ProductListRegistrationForm;
