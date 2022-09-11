import TextFieldLabelAbove from "../textFieldLabelAbove";
import style from "./relatedInputs.module.css";


const RelatedInputs = ({ register, optType, mainType, mainName, optName, mainTitle, mainPlaceholder, optPlaceholder, optTitle, isRequire }) => {
    return (
        <div className={style.doubleInputs}>

            <TextFieldLabelAbove
                register={register(mainName, {
                    required: {
                        value: isRequire,
                        message: 'Field is required'
                    }
                })}
                title={mainTitle}
                name={mainName}
                type={mainType}
                placeholder={mainPlaceholder} />

            <TextFieldLabelAbove
                register={register(optName, {
                    required: {
                        value: isRequire,
                        message: 'Field is required'
                    }
                })}
                title={optTitle}
                name={optName}
                type={optType}
                placeholder={optPlaceholder} />
        </div>
    );
};

export default RelatedInputs;