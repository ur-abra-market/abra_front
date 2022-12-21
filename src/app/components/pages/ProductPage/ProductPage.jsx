import React, {useEffect} from 'react'
import {InfoBtn} from '../../common/buttons'
import FlagFavorites from '../../ui/product/FlagFavorites'
import ProductAbout from '../../ui/product/ProductAbout'
import ProductPath from '../../ui/product/ProductPath'
import ProductPhoto from '../../ui/product/ProductPhoto'
import Reward from '../../ui/product/Reward'
import StatusSeller from '../../ui/product/StatusSeller'
import style from './ProductPage.module.css'
import ProductStatistics from '../../ui/product/ProductStatistics'
import ProductReview from './ProductReview/ProductReview'
import LatestSearch from '../../ui/product/LatestSearch'
import Footer from '../../common/Footer'
import Header from '../../common/Header'
import {useDispatch, useSelector} from 'react-redux'
import {getSimilarProducts} from '../../../store/reducers/similarProducts'
import {
    getGradesByProductId,
    getProductById
} from '../../../store/reducers/targetProductSlice'
import {useParams} from 'react-router-dom'
import ChoiceProduct from '../../ui/product/ChoiceProduct'
import {Status} from '../../../store/enums/status.enum'
import Loader from '../../common/Loader'
import {PopularProduct} from './PopularProduct/PopularProduct'
import {SimilarProduct} from './SimilarProduct/SimilarProduct'
import {getPopularProductsById} from '../../../store/reducers/popularProducts'


const latestSearchData = [
    {search_query: 'Tag 1', datetime: ''},
    {search_query: 'Tag 2', datetime: ''},
    {search_query: 'Tag 3', datetime: ''},
    {search_query: 'Tag 4', datetime: ''},
    {search_query: 'Tag 5', datetime: ''},
    {search_query: 'Tag 6', datetime: ''},
    {search_query: 'Tag 7', datetime: ''},
    {search_query: 'Tag 8', datetime: ''},
    {search_query: 'Tag 9', datetime: ''},
    {search_query: 'Tag 10', datetime: ''},
    {search_query: 'Tag 11', datetime: ''},
    {search_query: 'Tag 12', datetime: ''},
    {search_query: 'Tag 13', datetime: ''},
    {search_query: 'Tag 14', datetime: ''},
    {search_query: 'Tag 15', datetime: ''},
]

// {
//     "result": {
//     "grade": {
//         "grade_average": "0.0",
//             "count": 0
//     },
//     "category_id": 25,
//         "category_path": "/Men's clothes/Clothing/Shirts",
//         "product_name": "sdfsdf",
//         "is_favorite": false,
//         "tags": [],
//         "colors": [
//         "blue",
//         "pink",
//         "purple"
//     ],
//         "sizes": [
//         "6XL",
//         "L",
//         "XL"
//     ],
//         "monthly_actual_demand": "0",
//         "daily_actual_demand": "0",
//         "prices": [
//         {
//             "value": "2.00",
//             "min_quantity": 3,
//             "discount": null,
//             "start_date": "2022-11-05 13:59:56",
//             "end_date": null
//         }
//     ],
//         "supplier_info": {
//         "name": "fghfd",
//             "grade_average": "0.0",
//             "total_deals": "6075",
//             "value": 3,
//             "period": "months"
//     }
// }
// }

const ProductPage = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()

    const {
        product,
        status,
        images
    } = useSelector(state => state.targetProduct)

    console.log('RENDER!!!!')

    useEffect(() => {
        dispatch(getProductById({product_id: productId}))
        dispatch(getGradesByProductId({product_id: productId}))
        dispatch(getSimilarProducts({productId}))
        dispatch(getPopularProductsById({product_id: productId}))
    }, [])


    const addOrRemoveProductFavorites = () => {
        // добавление в избранное логика
    }


    if (status === Status.Loading)
        return <Loader/>

//TODO обработать все ошибки если нет данных!!!!!! и правильную переадресацию
    if (!product)
        return null

    const {
        grade,
        category_path, product_name, is_favorite, tags, colors, sizes,
        monthly_actual_demand, daily_actual_demand, supplier_info,
        prices
    } = product


    return (
        <>
            <Header/>
            <main className={style.productPage}>
                {/*<Modal active={modalOpen} close={setModalOpen}>*/}

                {/*</Modal>*/}
                <div className={style.productPage__basic}>
                    <div className={style.productPage__basic_left}>
                        <ProductPath
                            pathArr={[category_path, '/Dress', '/Spring-Summer']}/>
                        {images && <ProductPhoto photoArray={images}/>}
                    </div>
                    <div className={style.productPage__basic_right}>
                        <div className={style.productPage__basic_top}>
                            <Reward star grade={grade}/>
                            <FlagFavorites active={is_favorite}
                                           onClick={addOrRemoveProductFavorites}/>
                        </div>
                        <h2>
                            <span>{product_name}</span>
                        </h2>
                        <div className={style.productPage__basic_block1}>
                            <div className={style.productPage__basic_path}>
                                {tags?.map(tag => <p key={tag}>{tag}</p>)}
                            </div>
                        </div>
                        <div className={style.productPage__basic_block2}>
                            <ChoiceProduct
                                colors={colors?.length !== 0 ? colors : ['red', 'blue', 'black', 'beige']}/>
                            <ProductStatistics
                                sizes={sizes?.length !== 0 ? sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                                dailyActualDemand={daily_actual_demand}
                                prices={prices?.[0]}
                                monthlyActualDemand={monthly_actual_demand}/>

                        </div>
                        <button className={style.productPage__button}>Add to Cart</button>
                        <div className={style.productPage__line}/>
                        <StatusSeller supplierInfo={supplier_info}/>
                    </div>
                </div>

                <ProductAbout/>
                <ProductReview/>
                <SimilarProduct/>
                <PopularProduct/>
                <LatestSearch latestSearchData={latestSearchData}/>
                <InfoBtn/>
            </main>
            <Footer/>
        </>
    )
}

export default ProductPage
