import React from 'react'
import BtnNewBest from '../../common/BtnNewBest/BtnNewBest'
import ChoiceProduct from '../../ui/product/ChoiceProduct'
import FlagFavorites from '../../ui/product/FlagFavorites'
import ProductAbout from '../../ui/product/ProductAbout'
import ProductPath from '../../ui/product/ProductPath'
import ProductPhoto from '../../ui/product/ProductPhoto'
import Reward from '../../ui/product/Reward'
import Slider from '../../common/Slider'
import StatusSeller from '../../ui/product/StatusSeller'
import './ProductPage.css'
import ProductStatistics from '../../ui/product/ProductStatistics'
import ProductReview from '../../ui/product/ProductReview'
import LatestSearch from '../../ui/product/LatestSearch'
import InfoBtn from '../../common/InfoBtn/InfoBtn'

const ProductPage = () => {
  const data = ["Similar products", "Popular products in this category"];
  return (
    <div className="ProductPage">
      <div className="ProductPage__basic">
        <div className="ProductPage__basic_left">
          <ProductPath />
          <ProductPhoto />
        </div>
        <div className="ProductPage__basic_right">
          <div className="ProductPage__basic_top">
            <div className="ProductPage__basic_top-btn">
              <BtnNewBest name="Bestseller" />
              <BtnNewBest name="New Arrivals" />
            </div>
            <Reward star={true} />
          </div>
          <h2>
            Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
            Clothes
          </h2>
          <div className="ProductPage__basic_block1">
            <div className="ProductPage__basic_path">
              <p>Clothes for women</p>
              <p>Dress</p>
              <p>Spring-Summer</p>
            </div>
            <FlagFavorites />
          </div>
          <div className="ProductPage__basic_block2">
            <ChoiceProduct />
            <ProductStatistics />
          </div>
          <div className="ProductPage__button">Add to Cart</div>
          <div className="ProductPage__line" />
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
  )
}

export default ProductPage;
