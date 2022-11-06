import React from 'react'
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

const ProductPage = () => {
  const data = ['Similar products', 'Popular products in this category']
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
        <Slider title={data[0]} />
        <Slider title={data[1]} />
        <LatestSearch />
        <InfoBtn />
      </div>
      <Footer />
    </>
  )
}

export default ProductPage
