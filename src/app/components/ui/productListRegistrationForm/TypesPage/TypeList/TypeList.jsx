import RadiosFor from "../../../radiosFor";
import CheckboxFor from "../../../checkboxFor";

export const TypeList = ({colors, sizes, getValues, register, types}) => {

    return (
        <div>
            {types.map((el) => (
                <div key={el.id}
                     style={{display: el.selected ? 'inline' : 'none'}}
                >
                    <RadiosFor
                        typeId={el.id}
                        register={register}
                        title={`Select color ${el.id}`}
                        state={"no color"}
                        array={colors}
                        name={"color"}
                    />

                    <CheckboxFor
                        typeId={el.id}
                        getValues={getValues}
                        register={register}
                        title={`Size and Quantity ${el.id}`}
                        array={sizes}
                    />
                </div>
            ))}
        </div>
    )
}