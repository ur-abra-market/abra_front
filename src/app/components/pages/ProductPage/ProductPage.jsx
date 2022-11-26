import React, { useEffect } from 'react'
import { BtnNewBest, InfoBtn } from '../../common/buttons'
import ChoiceProduct from '../../ui/product/ChoiceProduct'
import FlagFavorites from '../../ui/product/FlagFavorites'
import ProductAbout from '../../ui/product/ProductAbout'
import ProductPath from '../../ui/product/ProductPath'
import ProductPhoto from '../../ui/product/ProductPhoto'
import Reward from '../../ui/product/Reward'
import Slider from '../../common/Slider'
import StatusSeller from '../../ui/product/StatusSeller'
import style from './ProductPage.module.css'
import ProductStatistics from '../../ui/product/ProductStatistics'
import ProductReview from '../../ui/product/ProductReview'
import LatestSearch from '../../ui/product/LatestSearch'
import Footer from '../../common/Footer'
import Header from '../../common/Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductList } from '../../../store/reducers/mainPageSlice'

const ProductPage = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.product.statusProduct)
  const categories = useSelector((state) => state.mainPageProducts.products)

  const CATEGORIES = {
    0: 'All categories',
    1: `Women's clothes`
  }

  useEffect(() => {
    Object.keys(CATEGORIES).forEach((category) => {
      dispatch(fetchProductList({ type: filter, category }))
    })
  }, [filter])

  return (
    <>
      <Header />
      <div className={style.productPage}>
        <div className={style.productPage__basic}>
          <div className={style.productPage__basic_left}>
            <ProductPath />
            <ProductPhoto />
          </div>
          <div className={style.productPage__basic_right}>
            <div className={style.productPage__basic_top}>
              <div className={style.productPage__basic_top_btn}>
                <BtnNewBest name="Bestseller" />
                <BtnNewBest name="New Arrivals" />
              </div>
              <Reward star={true} />
            </div>
            <h2>
              Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
              Clothes
            </h2>
            <div className={style.productPage__basic_block1}>
              <div className={style.productPage__basic_path}>
                <p>Clothes for women</p>
                <p>Dress</p>
                <p>Spring-Summer</p>
              </div>
              <FlagFavorites />
            </div>
            <div className={style.productPage__basic_block2}>
              <ChoiceProduct />
              <ProductStatistics />
            </div>
            <div className={style.productPage__button}>Add to Cart</div>
            <div className={style.productPage__line} />
            <StatusSeller />
          </div>
        </div>
        <ProductAbout />
        <ProductReview />
        {Object.keys(CATEGORIES).map((categoryId) => (
          <Slider
            key={categoryId}
            title={CATEGORIES[categoryId]}
            products={categories[categoryId]}
          />
        ))}
        <LatestSearch />
        <InfoBtn />
      </div>
      <Footer />
    </>
  )
}

export default ProductPage
