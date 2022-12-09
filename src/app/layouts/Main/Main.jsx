import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import './Main.css'

const Main = () => {
  const isLoading = useSelector((state) => state.mainPageProducts.isLoading)

  return (
    <div className="container">
      {isLoading && <Loader />}
      <Outlet />
    </div>
  )
}

export default Main
