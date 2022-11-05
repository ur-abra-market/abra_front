import {TypeBar} from "./TypeBar/TypeBar";
import {TypeList} from "./TypeList/TypeList";

export const TypesPage = ({variations, getValues, register, setTypes, types}) => {

    const [sizes, colors] = [variations['size'], variations['color']]

    return (
        <>
            <TypeBar types={types}
                     setTypes={setTypes}
            />

            <TypeList types={types}
                      sizes={sizes}
                      colors={colors}
                      getValues={getValues}
                      register={register}
            />
        </>
    )
}

