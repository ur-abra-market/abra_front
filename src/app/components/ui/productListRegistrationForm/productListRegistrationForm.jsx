import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropDownField from "../../common/dropDownField";
import Form from "../../common/form";
import FormTitle from "../../common/formTitle";
import SelectLabelAbove from "../../common/selectLabelAbove";
import TextFieldLabelAbove from "../../common/textFieldLabelAbove";
import RadiosFor from "../radiosFor";
import style from "./productListRegistrationForm.module.css";
import CheckboxFor from "../checkboxFor";
import MaterialInputs from "../materialInputs";
import ProdInfoInputs from "../prodInfoInputs";
import ButtonReg from "../../common/buttons/buttonReg";
import { SelectionsForProperties } from "./SelectionsForProperties/SelectionsForProperties";
import {
  addProductService,
  uploadImageService,
} from "../../../store/reducers/supplierSlice";
import { ImagesAdding } from "../../common/imageAdding/ImagesAdding";
import Loader from "../../common/Loader";

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
  const { productId, loading } = useSelector((state) => state.supplier);

  const companyInfo = useSelector((state) => state.supplier.companyInfo);

  const [isSubmit, setIsSubmit] = useState(false);
  const [images, setImages] = useState([]);

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: "onChange" });

  const values = productProperties?.map((el) => el.key);

  const createObjProperty = (el, obj) => {
    const optional_value = obj[`${el}(optional)`];
    const value = obj[el];
    let finalObj = {
      name: el,
      value,
    };
    if (optional_value) {
      finalObj = { ...finalObj, optional_value };
    }
    return finalObj;
  };

  const onSubmit = (data) => {
    let keysData = Object.keys(data);

    const childs = [];
    productVariations["size"]?.forEach((el) => {
      if (data[el]) {
        childs.push({
          name: "size",
          value: el,
          count: data[el],
        });
      }
    });

    const properties = [];
    values.forEach((el) => {
      properties.push(createObjProperty(el, data));
    });

    const addedMaterialKeys = [];
    const addedMaterialValues = [];
    keysData.forEach((el) => {
      if (el.slice(0, 3) === "opt") {
        addedMaterialKeys.push(el);
      }
      if (el.slice(0, 4) === "main") {
        addedMaterialValues.push(el);
      }
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
      variations: [
        {
          name: "color",
          value: data.color,
          childs,
        },
      ],
      prices,
    };

    dispatch(addProductService({ product: productInfo }));
    setIsSubmit(true);
    reset();
  };

  const variations = productVariations ? productVariations : [];
  const variationKeys = Object.keys(variations);

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
          })
        );
      });

      navigate("/");
    }
  }, [productId]);
  return (
    <div className={style.formWrapper}>
      <div className={style.formContainer}>
        <>
          <FormTitle
            step={companyInfo?.name ? "" : "Step 3/3"}
            link={companyInfo?.name ? "Back" : "Skip and Get started"}
            title={"Product list"}
            text={"Enter the information about your first product"}
          />
          <Form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className={style.form}>
              <DropDownField isShow={true} title={"Main Product Info"}>
                <TextFieldLabelAbove
                  register={register("prodName", {
                    required: "Field is required",
                  })}
                  error={errors?.prodName?.message}
                  title={"Product name *"}
                  name={"prodName"}
                  type={"text"}
                  placeholder={"Enter the product name"}
                />

                <div className={style.selectInputs}>
                  <div className={style.selectEqual}>
                    <SelectLabelAbove
                      value={firstCategory}
                      onChangeOption={setFirstCategory}
                      options={firstStageCategories}
                      register={register("category", {
                        required: true,
                      })}
                      title={"Category *"}
                      name={"category"}
                      placeholder={"Select"}
                    />
                  </div>

                  <div className={style.selectEqual}>
                    <SelectLabelAbove
                      value={secondCategory}
                      onChangeOption={setSecondCategory}
                      options={secondStageCategories}
                      register={register("type1", {
                        required: true,
                      })}
                      title={"Type 1 *"}
                      name={"type1"}
                      placeholder={"Select"}
                    />
                  </div>

                  {thirdStageCategories && !!thirdStageCategories.length && (
                    <div className={style.selectEqual}>
                      <SelectLabelAbove
                        value={thirdCategory}
                        onChangeOption={setThirdCategory}
                        options={thirdStageCategories}
                        register={register("type2")}
                        title={"Type 2 *"}
                        name={"type2"}
                        placeholder={"Select"}
                      />
                    </div>
                  )}
                </div>

                <p className={style.listImgTitle}>
                  Photo of the company or production
                </p>

                <div className={style.listImg}>
                  {[...new Array(5)].map((el, i) => (
                    <ImagesAdding
                      key={i}
                      images={images}
                      setImages={setImages}
                    />
                  ))}
                </div>

                <TextFieldLabelAbove
                  register={register("textarea")}
                  title={"Description"}
                  name={"textarea"}
                  placeholder={"Enter the description of your product"}
                />
              </DropDownField>

              <DropDownField
                isShow={!!productProperties && !!productVariations}
                title={"Properties"}
              >
                {loading ? (
                  <Loader />
                ) : (
                  productProperties &&
                  productProperties.map((el, i) => {
                    const values = [
                      ...new Set(el.values.map((el) => el.value)),
                    ];

                    return (
                      <SelectionsForProperties
                        key={i}
                        element={el}
                        options={values}
                        register={register}
                        placeholder={"Select"}
                      />
                    );
                  })
                )}

                <MaterialInputs
                  register={register}
                  mainTitle={"Material (optional)"}
                  optTitle={"% (optional)"}
                  mainPlaceholder={"Enter the material name"}
                  optPlaceholder={"Enter percentage of material"}
                  mainType={"text"}
                  optType={"number"}
                />

                <RadiosFor
                  register={register}
                  title={"Select color *"}
                  state={"no color"}
                  array={variations[variationKeys[1]]}
                  name={"color"}
                />

                <CheckboxFor
                  getValues={getValues}
                  register={register}
                  title={"Size and Quantity *"}
                  array={variations[variationKeys[0]]}
                />
              </DropDownField>

              <DropDownField
                isShow={!!productProperties && !!productVariations}
                title={"Additional Product Info"}
              >
                <ProdInfoInputs register={register} />
              </DropDownField>

              <ButtonReg
                type={"submit"}
                value={"Continue"}
                isValid={!isValid}
              />
            </div>
          </Form>
        </>
      </div>
    </div>
  );
};

export default ProductListRegistrationForm;
