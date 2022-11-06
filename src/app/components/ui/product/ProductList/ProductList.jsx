import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CardFull from '../../../common/CardFull'
import Card from '../../../common/Card'
import Paginator from '../../../common/Paginator'
import ShowPage from '../../../common/ShowPage'
import { InfoBtn } from '../../../common/buttons'
import style from './ProductList.module.css'

const ProductList = () => {
  const dataArr = useSelector(
    (state) => state.productPaginate.dataProductPaginate
  )
  const [list, setList] = useState(true)

  return (
    <div className={style.productList}>
      <div className={style.productList__control}>
        <div className={style.productList__control_btns}>
          <div
            className={style.productList__control_blocks}
            onClick={() => setList(false)}
          />
          <div
            className={style.productList__control_list}
            onClick={() => setList(true)}
          />
          <div
            className={style.productList__control_category}
          >{`< Clothes and Accessories`}</div>
        </div>
        <Paginator />
      </div>
      <div className={style.productList__list}>
        {dataArr.map((data, index) =>
          list ? (
            <CardFull key={`${data}-${index}`} props={data} />
          ) : (
            <Card key={`${data}-${index}`} props={data} />
          )
        )}
      </div>
      <div className={style.productList__control}>
        <ShowPage />
        <Paginator />
      </div>
      <div className={style.productList__InfoBtn}>
        <InfoBtn />
      </div>
    </div>
  )
}

export default ProductList
