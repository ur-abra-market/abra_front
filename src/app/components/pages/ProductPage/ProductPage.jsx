import React, {useEffect} from 'react'
import {InfoBtn} from '../../common/buttons'
import FlagFavorites from '../../ui/product/FlagFavorites'
import ProductAbout from '../../ui/product/ProductAbout'
import ProductPath from '../../ui/product/ProductPath'
import ProductPhoto from '../../ui/product/ProductPhoto'
import Reward from '../../ui/product/Reward'
import {Carousel} from '../../common'
import StatusSeller from '../../ui/product/StatusSeller'
import style from './ProductPage.module.css'
import ProductStatistics from '../../ui/product/ProductStatistics'
import ProductReview from '../../ui/product/ProductReview'
import LatestSearch from '../../ui/product/LatestSearch'
import Footer from '../../common/Footer'
import Header from '../../common/Header'
import {useDispatch, useSelector} from 'react-redux'
import {getSimilarProducts} from '../../../store/reducers/similarProducts'
import {
    getPopularProductById,
    getProductById
} from '../../../store/reducers/targetProductSlice'
import {Link, useParams} from 'react-router-dom'
import {ReactComponent as LoupeIcon} from './../../../assets/img/icons/loupe.svg'
//import ImgSlider from '../../common/ImgSlider'
import Stars from '../../common/Stars'
import ChoiceProduct from '../../ui/product/ChoiceProduct'
//TODO удалить как получу фото
// import testImg from '../../common/Carousel/testSimilarImg.jpg'
// import testImg2 from '../../common/Carousel/test2.png'
import {Status} from '../../../store/enums/status.enum'
import Loader from '../../common/Loader'
import Flag from '../../common/Flag'
// import Modal from '../../common/Modal'
// import ProductInfo from './ProductInfo/ProductInfo'

const getPriceOneItem = (params) => {
    const {price_include_discount, min_quantity} = params
    // заглушка так как нет данных
    if (!price_include_discount || !min_quantity)
        return 'not data'


    const price = parseFloat(price_include_discount.replace(/,/g, '')) / min_quantity
    return price.toFixed(2)
}

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

const ProductPage = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()

    const {similarProducts} = useSelector(state => state.similarProducts)
    const {
        product,
        popularProducts,
        status,
        images
    } = useSelector(state => state.targetProduct)
    //const [modalOpen, setModalOpen] = useState(false)

    console.log('PRODUCT_ID', productId)
    console.log('PRODUCT', product)
    console.log('PRODUCT_IMAGES', images)
    const {
        grade, category_path, product_name, is_favorite, tags, colors, sizes,
        monthly_actual_demand, daily_actual_demand, supplier_info,
        prices
    } = product


    useEffect(() => {
        dispatch(getProductById({product_id: productId}))
        dispatch(getSimilarProducts({productId}))
        dispatch(getPopularProductById({product_id: productId}))
    }, [])


    const addOrRemoveProductFavorites = () => {
        // добавление в избранное логика
    }

    const buildCarouselSimilarProducts = () => {
        return similarProducts && similarProducts.map((data, index) => {
            const {
                name,
                price_include_discount,
                //total_orders,
                image_url,
                //supplier_id,
                description,
                //with_discount,
                id,
                min_quantity,
                grade_average
            } = data
            return (
                <div className={style.card} key={data.id + '-' + index}>
                    <div className={style.card__image}>
                        <Flag className={style.card__flag}/>
                        <img src={image_url} alt={name}/>
                        <span className={style.card__hover}>
                            <span className={style['card__hover-text']}>
                                <LoupeIcon />
                                <span>Quick View</span>
                            </span>
                        </span>
                    </div>
                    <Link to={'/product/' + id} className={style.card__link}>
                        <div className={style.card__direction}>
                            <span>{name}</span>
                            <span>{description}</span>
                        </div>
                    </Link>
                    <div className={style.card__price}>
                        <div className={style.amount}>
                            {getPriceOneItem({price_include_discount, min_quantity})}/pc
                        </div>
                        <span>{`/from ${min_quantity || 1} pcs`}</span>
                    </div>
                    <Stars reward={parseFloat(grade_average) || 0}/>
                </div>
            )
        })
    }

    const buildCarouselPopularProducts = () => {
        return popularProducts && popularProducts.map((data, index) => {
            const {
                name,
                price_include_discount,
                //total_orders,
                image_url,
                //supplier_id,
                description,
                id,
                min_quantity,
                grade_average
            } = data
            return (
                <div className={style.card} key={id + '-' + index}>
                    <div className={style.card__image}>
                        <Flag className={style.card__flag}/>
                        <img src={image_url} alt={name}/>
                        <span className={style.card__hover}>
                            <span className={style['card__hover-text']}>
                                <LoupeIcon />
                                <span>Quick View</span>
                            </span>
                        </span>
                    </div>
                    <Link to={'/product/' + id} className={style.card__link}>
                        <div className={style.card__direction}>
                            <span>{name}</span>
                            <span>{description}</span>
                        </div>
                    </Link>
                    <div className={style.card__price}>
                        <div className={style.amount}>
                            {getPriceOneItem({price_include_discount, min_quantity})}/pc
                        </div>
                        <span>{`/from ${min_quantity} pcs`}</span>
                    </div>
                    <Stars reward={parseFloat(grade_average) || 0}/>
                </div>
            )
        })
    }

    if (status !== Status.Success)
        return <Loader/>

    return (
        <>
            <Header/>
            <main className={style.productPage}>
                {/*<Modal active={modalOpen} close={setModalOpen}>*/}
                {/*    {modalOpen && <ProductInfo product={ {...product, photoAll, close: setModalOpen } } />}*/}
                {/*</Modal>*/}
                <div className={style.productPage__basic}>
                    <div className={style.productPage__basic_left}>
                        <ProductPath
                            pathArr={[category_path, '/Dress', '/Spring-Summer']}/>
                        <ProductPhoto photoArray={images}/>
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
                                colors={colors.length !== 0 ? colors : ['red', 'blue', 'black', 'beige']}/>
                            <ProductStatistics
                                sizes={sizes.length !== 0 ? sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                                dailyActualDemand={daily_actual_demand}
                                prices={prices[0]}
                                monthlyActualDemand={monthly_actual_demand}/>

                        </div>
                        <button className={style.productPage__button}>Add to Cart</button>
                        <div className={style.productPage__line}/>
                        <StatusSeller supplierInfo={supplier_info}/>
                    </div>
                </div>

                <ProductAbout/>

                <ProductReview/>
                {similarProducts && similarProducts.length > 0 &&
                    <Carousel title='Similar products'
                              arrayLength={similarProducts.length}>
                        {buildCarouselSimilarProducts()}
                    </Carousel>}

                {popularProducts && popularProducts.length > 0 &&
                    <Carousel title='Popular products in this category'
                              arrayLength={popularProducts.length}>
                        {buildCarouselPopularProducts()}
                    </Carousel>}
                <LatestSearch latestSearchData={latestSearchData}/>
                <InfoBtn/>
            </main>
            <Footer/>
        </>
    )
}

export default ProductPage
