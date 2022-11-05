export const TypeBar = ({types, setTypes}) => {

    const addTypeHandler = () => {
        const newType = {id: types.length + 1, selected: true}
        setTypes([...types.map(el => ({...el, selected: false})), newType])
    }

    const changeSelectedTypeHandler = (id) => {
        setTypes(types.map((el) => el.id === id ?
            {...el, selected: true} : {...el, selected: false}))
    }

    return (
        <div style={{display: 'flex'}}>
            {types.map(type => (

                <div key={type.id}
                     onClick={() => changeSelectedTypeHandler(type.id)}
                     style={{
                         cursor: "pointer",
                         backgroundColor: type.selected ? 'grey' : 'lightgrey',
                         padding: 5,
                         marginRight: 10
                     }}
                >
                    Type {type.id}
                </div>
            ))}

            <button type={"button"}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: 'lightgrey',
                        padding: 5
                    }}
                    onClick={addTypeHandler}
            >
                +
            </button>
        </div>
    )
}