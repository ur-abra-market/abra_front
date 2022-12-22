import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {changeById} from '../../../store/reducers/basketSlice'
import style from './ProductQuantityControl.module.css'

const min = 100

//TODO переделать и повесить логику
const ProductQuantityControl = ({obj}) => {
    const dispatch = useDispatch()
    // const [value, setValue] = useState(obj.sum)
    const [value, setValue] = useState(min)
    const max = useSelector((state) => state.product.max)

    const handlerInput = () => {
        const newObj = {...obj}
        const a = Math.ceil(value / 100) * 100
        if (a < 0) newObj.sum = 0
        else if (a > max) newObj.sum = max
        else newObj.sum = a
        setValue(newObj.sum)
        dispatch(changeById({newObj}))
    }

    const handlerQuantity = (a) => {
        // const newObj = {...obj}
        // if (a <= 0) {
        //     newObj.sum -= 100
        //     newObj.sum = newObj.sum < 0 ? 0 : newObj.sum
        // }
        // if (a > 0) {
        //     newObj.sum += 100
        //     newObj.sum = newObj.sum > max ? max : newObj.sum
        // }
        // setValue(newObj.sum)
        //dispatch(changeById({ newObj }))

        if (a < 0 && value > min)
            setValue(prevState => prevState - 1)
        
        if (a > 0) 
            setValue(prevState => prevState + 1)

    }

    return (
        <div className={style.productQuantityControl}>
            <div
                className={style.productQuantityControl_btn}
                onClick={() => handlerQuantity(-1)}

            >
                —
            </div>
            <input
                className={style.productQuantityControl_sum}
                type="number"
                //max={max}
                min={min}
                step={1}
                value={value}
                onChange={(e) => setValue(+e.target.value)}
                onBlur={handlerInput}
            />
            <div
                className={style.productQuantityControl_btn}
                onClick={() => handlerQuantity(1)}
            >
                +
            </div>
        </div>
    )
}
ProductQuantityControl.propTypes = {
    obj: PropTypes.object
}

export default ProductQuantityControl
