import React, {useEffect, useState} from 'react'
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
    getProductByIdAndSellerId
} from '../../../store/reducers/targetProductSlice'
import {Link} from 'react-router-dom'
import ImgSlider from '../../common/ImgSlider'
import Stars from '../../common/Stars'
import ChoiceProduct from '../../ui/product/ChoiceProduct'
//TODO удалить как получу фото
import testImg from '../../common/Carousel/testSimilarImg.jpg'
import testImg2 from '../../common/Carousel/test2.png'
import {Status} from '../../../store/enums/status.enum'
import Loader from '../../common/Loader'
import Modal from '../../common/Modal'
import ProductInfo from './ProductInfo/ProductInfo'


const productId = 1
const sellerId = 2
const photoAll = [testImg, testImg, testImg, testImg, testImg, testImg, testImg2]
const latestSearchData = [
    'Tag 1',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    'Tag 5',
    'Tag 6',
    'Tag 7',
    'Tag 8',
    'Tag 9',
    'Tag 10',
    'Tag 11',
    'Tag 12',
    'Tag 13',
    'Tag 14',
    'Tag 15'
]

const ProductPage = () => {
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const {similarProducts} = useSelector(state => state.similarProducts)
    const {product, popularProducts, status} = useSelector(state => state.targetProduct)
    console.log(product)
    const {
        grade, category_path, product_name, is_favorite, tags, colors, sizes,
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
            const {
                name,
                description,
                with_discount,
                id,
                images,
                min_quantity,
                grade_average
            } = data
            const image = Array.isArray(images) ? data.images[0] : images ? images : testImg2
            return (
                <div className={style.card} key={data.id + '-' + index} onClick={() => setModalOpen(true)}>
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
            const {
                name,
                description,
                with_discount,
                id,
                images,
                min_quantity,
                grade_average,
                image_url
            } = data
            console.log('buildCarouselPopularProducts - image_url: ', image_url)
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
                    <Stars reward={grade_average}/>
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
                <Modal active={modalOpen} close={setModalOpen}>
                    {modalOpen && <ProductInfo product={ {...product, photoAll, close: setModalOpen } } />}
                </Modal>
                    <div className={style.productPage__basic}>
                        <div className={style.productPage__basic_left}>
                            <ProductPath
                                pathArr={[category_path, '/Dress', '/Spring-Summer']}/>
                            <ProductPhoto photoArray={photoAll}/>
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
