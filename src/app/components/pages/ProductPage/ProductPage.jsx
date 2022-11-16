import React, {useEffect} from 'react'
import { InfoBtn} from '../../common/buttons'
import FlagFavorites from '../../ui/product/FlagFavorites'
import ProductAbout from '../../ui/product/ProductAbout'
import ProductPath from '../../ui/product/ProductPath'
import ProductPhoto from '../../ui/product/ProductPhoto'
import Reward from '../../ui/product/Reward'
import { Carousel } from '../../common/Carousel'
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
    getProductByIdAndSellerId
} from '../../../store/reducers/targetProductSlice'
import {Link} from 'react-router-dom'
import ImgSlider from '../../common/ImgSlider'
import Stars from '../../common/Stars'
//TODO удалить как получу фото
import testImg from '../../common/Carousel/testSimilarImg.jpg'
import testImg2 from '../../common/Carousel/test2.png'
import {Status} from '../../../store/enums/status.enum'
import ChoiceProduct from '../../ui/product/ChoiceProduct'



const productId = 1
const sellerId = 2
const photoAll = [testImg, testImg, testImg, testImg, testImg, testImg,testImg2]

const ProductPage = () => {
    const dispatch = useDispatch()

    const {similarProducts} = useSelector(state => state.similarProducts)
    const {product, popularProducts, status} = useSelector(state => state.targetProduct)
    console.log(product)
    const {grade, category_path, product_name, is_favorite, tags, colors, sizes,
        monthly_actual_demand, daily_actual_demand, supplier_info,
        prices
    } = product


    useEffect(() => {
        dispatch(getProductByIdAndSellerId({product_id: productId, seller_id: sellerId}))
        dispatch(getSimilarProducts({productId}))
        dispatch(getPopularProductById({product_id: productId}))
    }, [])



    const addOrRemoveProductFavorites = () => {
        // добавление в избранное логика
    }

    const buildCarouselSimilarProducts = () => {
        return similarProducts && similarProducts.map((data, index) => {
            const { name, description, with_discount, id, images, min_quantity, grade_average } = data
            const image = Array.isArray(images) ? data.images[0] : images ? images : testImg2
            return (
                <div className={style.card} key={data.id + '-' + index}>
                    <ImgSlider srcArr={image}/>
                    <Link to={'/product/' + id} className={style.card__link}>
                        <div className={style.card__direction}>
                            <span>{name}</span>
                            <span>{description}</span>
                        </div>
                    </Link>
                    <div className={style.card__price}>
                        <div className={style.amount}>${with_discount}/pc</div>
                        <span>{`/from ${min_quantity || 1} pcs`}</span>
                    </div>
                    <Stars reward={+grade_average || 0}/>
                </div>
            )
        })
    }

    const buildCarouselPopularProducts = () => {
        return popularProducts && popularProducts.map((data, index) => {
            const { name, description, with_discount, id, images, min_quantity, grade_average, image_url } = data
            console.log('buildCarouselPopularProducts - image_url: ', image_url )
            const image = Array.isArray(images) ? data.images[0] : images ? data.images : testImg
            return (
                <div className={style.card} key={id + '-' + index}>
                    <ImgSlider srcArr={image}/>
                    <Link to={'/product/' + id} className={style.card__link}>
                        <div className={style.card__direction}>
                            <span>{name}</span>
                            <span>{description}</span>
                        </div>
                    </Link>
                    <div className={style.card__price}>
                        <div className={style.amount}>${with_discount}/pc</div>
                        <span>{`/from ${min_quantity} pcs`}</span>
                    </div>
                    <Stars reward={+grade_average || 0}/>
                </div>
            )
        })
    }

    if( status !== Status.Success)
        return <div>Loading</div>

    return (
        <>
            <Header/>
            <div className={style.productPage}>
                <div className={style.productPage__basic}>
                    <div className={style.productPage__basic_left}>
                        <ProductPath pathArr={[category_path, '/Dress', '/Spring-Summer']}/>
                        <ProductPhoto photoArray={photoAll} />
                    </div>
                    <div className={style.productPage__basic_right}>
                        <div className={style.productPage__basic_top}>
                            {/*<div className={style.productPage__basic_top_btn}>*/}
                            {/*    <BtnNewBest name="Bestseller"/>*/}
                            {/*    <BtnNewBest name="New Arrivals"/>*/}
                            {/*</div>*/}
                            <Reward star grade={grade}/>
                        </div>
                        <h2>
                            <span>{product_name}</span>
                        </h2>
                        <div className={style.productPage__basic_block1}>
                            <div className={style.productPage__basic_path}>
                                {tags?.map( tag => <p key={tag}>{tag}</p>)}
                            </div>
                            <FlagFavorites active={is_favorite} onClick={addOrRemoveProductFavorites}/>
                        </div>
                        <div className={style.productPage__basic_block2}>
                            <ChoiceProduct colors={colors.length !==0 ? colors : ['#828282', '#b9b9b9', '#cfcfcf', '#dddddd']}/>
                            <ProductStatistics
                                sizes={sizes.length !== 0 ? sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                                dailyActualDemand={daily_actual_demand}
                                prices={prices[0]}
                                monthlyActualDemand={monthly_actual_demand}/>

                        </div>
                        <div className={style.productPage__button}>Add to Cart</div>
                        <div className={style.productPage__line}/>
                        <StatusSeller supplierInfo={supplier_info}/>
                    </div>
                </div>
                <ProductAbout/>
                <ProductReview/>
                {similarProducts &&
                    <Carousel title='Similar products'
                              arrayLength={similarProducts.length}>
                        {buildCarouselSimilarProducts()}
                    </Carousel>}
                {popularProducts &&
                    <Carousel title='Popular products in this category'
                              arrayLength={popularProducts.length}>
                        {buildCarouselPopularProducts()}
                    </Carousel>}
                <LatestSearch/>
                <InfoBtn/>
            </div>
            <Footer/>
        </>
    )
}

export default ProductPage
