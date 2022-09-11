import { useState } from "react";
import RelatedInputs from "../../common/relatedInputs";
import style from "./materialInputs.module.css";


const MaterialInputs = ({ register, mainTitle, optTitle, mainPlaceholder, optPlaceholder, fakeArr, mainType, optType }) => {

    const [count, setCount] = useState(1)

    const addInputs = () => {
        setCount(count + 1)
        fakeArr.push(count)
    }

    return (
        <div className={style.inputsContainer}>

            <RelatedInputs
                register={register}
                mainTitle={mainTitle}
                mainName={`main0`}
                mainType={mainType}
                mainPlaceholder={mainPlaceholder}
                optTitle={optTitle}
                optName={`opt0`}
                optType={optType}
                optPlaceholder={optPlaceholder} />

            {fakeArr.map((e) => {
                return (<div key={e}>
                    <RelatedInputs
                        register={register}
                        mainName={`main${e}`}
                        mainType={mainType}
                        mainPlaceholder={mainPlaceholder}
                        optName={`opt${e}`}
                        optType={optType}
                        optPlaceholder={optPlaceholder} />

                </div>)
            })}

            <p className={style.add}
                onClick={addInputs}>+ Add material</p>

        </div>
    );
};

export default MaterialInputs;