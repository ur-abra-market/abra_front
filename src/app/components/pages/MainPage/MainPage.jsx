import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from '../../common/Slider'
import StatusProduct from '../../common/StatusProduct'
import { InfoBtn } from '../../common/buttons'
import Feedback from '../../ui/feedback/Feedback'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import { fetchProductList } from '../../../store/reducers/mainPageSlice'
import style from './MainPage.module.css'

const MainPage = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.product.statusProduct)
  const categories = useSelector((state) => state.mainPageProducts.products)

  const CATEGORIES = {
    0: 'All categories',
    1: `Women's clothes`,
    2: `Men's clothes`,
    3: `Kid's clothes`
  }

  useEffect(() => {
    Object.keys(CATEGORIES).forEach((category) => {
      dispatch(fetchProductList({ type: filter, category }))
    })
  }, [filter])

  return (
    <>
      <div className={style.main_page}>
        <Header />
        <StatusProduct />
        <div className={style.main__sliders}>
          {Object.keys(categories).map((categoryId) => (
            <Slider
              key={categoryId}
              title={CATEGORIES[categoryId]}
              products={categories[categoryId]}
            />
          ))}
        </div>
        <InfoBtn />
      </div>
      <Feedback />
      <Footer />
    </>
  )
}

export default MainPage
