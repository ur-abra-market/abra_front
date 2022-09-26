import ProductListRegistrationForm from "../../ui/productListRegistrationForm";
import {useEffect, useState} from "react";
import {
    categoryService,
    getCategories,
    getChilds
} from "../../../store/reducers/categorySlice";
import {useDispatch, useSelector} from "react-redux";

const ProductListRegistrationPage = () => {

    const dispatch = useDispatch()

    const [firstCategory, setFirstCategory] = useState('')
    const [secondCategory, setSecondCategory] = useState('')
    const [thirdCategory, setThirdCategory] = useState('')

    const allCategories = useSelector(state => state.category.dateCategories)

    const secondsChilds = useSelector(getChilds(firstCategory, allCategories))
    const thirdChilds = useSelector(getChilds(secondCategory, secondsChilds))

    const getFirstCategories = useSelector(getCategories(allCategories))
    const getSecondCategories = useSelector(getCategories(secondsChilds))
    const getThirdCategories = useSelector(getCategories(thirdChilds))


    const getId = (date, value) => {
        if (date && value) {
            const objCategory = date.find(el => el.name === value)
            return objCategory?.id
        }
    }

    const categoryId = thirdChilds && thirdChilds.length
        ? getId(thirdChilds, thirdCategory)
        : getId(secondsChilds, secondCategory)


    useEffect(() => {
        setSecondCategory('')
        setThirdCategory('')
    }, [firstCategory])

    useEffect(() => {
        setThirdCategory('')
    }, [secondCategory])

    useEffect(() => {
        dispatch(categoryService())
    }, [])

    if (allCategories)
        return (
            <div>
                <ProductListRegistrationForm firstCategory={firstCategory}
                                             setFirstCategory={setFirstCategory}
                                             secondCategory={secondCategory}
                                             setSecondCategory={setSecondCategory}
                                             thirdCategory={thirdCategory}
                                             setThirdCategory={setThirdCategory}
                                             firstStageCategories={getFirstCategories}
                                             secondStageCategories={getSecondCategories}
                                             thirdStageCategories={getThirdCategories}
                />
            </div>
        );
};

export default ProductListRegistrationPage;