import React, {useEffect} from 'react'
import {BtnNewBest, InfoBtn} from '../../common/buttons'
import FlagFavorites from '../../ui/product/FlagFavorites'
import ProductAbout from '../../ui/product/ProductAbout'
import ProductPath from '../../ui/product/ProductPath'
import ProductPhoto from '../../ui/product/ProductPhoto'
import Reward from '../../ui/product/Reward'
import Slider from '../../common/SliderNew'
import StatusSeller from '../../ui/product/StatusSeller'
import style from './ProductPage.module.css'
import ProductStatistics from '../../ui/product/ProductStatistics'
import ProductReview from '../../ui/product/ProductReview'
import LatestSearch from '../../ui/product/LatestSearch'
import Footer from '../../common/Footer'
import Header from '../../common/Header'
import {useDispatch, useSelector} from 'react-redux'
import {getSimilarProducts} from '../../../store/reducers/similarProducts'


//TODO переделать слайдер так как он должен быть универсальный
//TODO уточнить логику show view на фотках в слайдере
//TODO уточнить за роут product/similar/productId - не полный объект
const ProductPage = () => {
    const data = ['Similar products', 'Popular products in this category']
    const dispatch = useDispatch()

    const { similarProducts } = useSelector( state => state.similarProducts)
    console.log('similarProducts', similarProducts)

    useEffect(() => {
        dispatch(getSimilarProducts(1))
    }, [])

    return (
        <>
            <Header/>
            <div className={style.productPage}>
                <div className={style.productPage__basic}>
                    <div className={style.productPage__basic_left}>
                        <ProductPath/>
                        <ProductPhoto/>
                    </div>
                    <div className={style.productPage__basic_right}>
                        <div className={style.productPage__basic_top}>
                            <div className={style.productPage__basic_top_btn}>
                                <BtnNewBest name="Bestseller"/>
                                <BtnNewBest name="New Arrivals"/>
                            </div>
                            <Reward star={true}/>
                        </div>
                        <h2>
                            Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress
                            Fall
                            Clothes
                        </h2>
                        <div className={style.productPage__basic_block1}>
                            <div className={style.productPage__basic_path}>
                                <p>Clothes for women</p>
                                <p>Dress</p>
                                <p>Spring-Summer</p>
                            </div>
                            <FlagFavorites/>
                        </div>
                        <div className={style.productPage__basic_block2}>
                            {/*<ChoiceProduct />*/}
                            <ProductStatistics/>
                        </div>
                        <div className={style.productPage__button}>Add to Cart</div>
                        <div className={style.productPage__line}/>
                        <StatusSeller/>
                    </div>
                </div>
                <ProductAbout/>
                <ProductReview/>
                <Slider title={data[0]} dataArr={similarProducts}/>
                <Slider title={data[1]} dataArr={[]}/>
                <LatestSearch/>
                <InfoBtn/>
            </div>
            <Footer/>
        </>
    )
}

export default ProductPage
