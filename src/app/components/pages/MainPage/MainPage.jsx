import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productPaginateService } from '../../../store/reducers/productPaginateSlice'
import './MainPage.css'
import Slider from '../../common/Slider'
import StatusProduct from '../../common/StatusProduct'
import { InfoBtn } from '../../common/buttons'
import Feedback from '../../ui/feedback/Feedback'
import Header from '../../common/Header'
import Footer from '../../common/Footer'

const MainPage = () => {
  const dispatch = useDispatch()
  const paginate = useSelector((state) => state.paginate)
  const filter = useSelector((state) => state.filter)
  const data = { ...filter, ...paginate }
  useEffect(() => {
    dispatch(productPaginateService(data))
  }, [paginate, filter])

  const dataArr = [
    'All categories',
    'Clothes and accessories',
    'Household products',
    'Cosmetics and self care'
  ]
  return (
    <>
      <div className="main-page">
        <Header />
        <StatusProduct />
        <div className="Main__sliders">
          {dataArr.map((data, index) => (
            <Slider key={`name-1-${index}`} title={data} />
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
