import React from 'react'

import { Link } from 'react-router-dom'

import { useAppSelector } from '../../../store/hooks'

import Stars from 'components/Stars'
import { getPercentagesOfTotalCountReview } from 'pages/ProductPage/helpers/getPercentagesOfTotalCountReview'
import style from 'pages/ProductPage/ProductReview/ProductReview.module.css'

const ProductReview = (): JSX.Element => {
  const { gradesData } = useAppSelector((state) => state.targetProduct)

  return (
    <section>
      <h2 className={style.title}>Feedbacks</h2>
      <Link to="/" className={style.link}>
        See all
      </Link>
      <div className={style.wrapper}>
        {!gradesData ? (
          <div>no data - error</div>
        ) : (
          <div className={style.grade}>
            <div className={style.stars_block}>
              {/* // @ts-ignore */}
              <Stars
                reward={parseFloat(String(gradesData?.grade_average)) || 0}
              />
              <span>
                {`${gradesData?.grade?.grade_average} / ${gradesData?.grade?.count} reviews`}
              </span>
            </div>
            {gradesData?.grade_details.map(({ grade, count }) => {
              return (
                <div key={grade} className={style.rating_line}>
                  <span>{`${grade} stars`}</span>
                  <span className={style.line}>
                    <span
                      className={style.line_accent}
                      style={{
                        width: getPercentagesOfTotalCountReview({
                          totalCount: gradesData?.grade?.count,
                          itemCount: count
                        })
                      }}
                    />
                  </span>
                  <span>{count}</span>
                </div>
              )
            })}
          </div>
        )}
        <div className={style.image_list}>
          <div className={style.image} />
          <div className={style.image} />
          <div className={style.image} />
        </div>
      </div>
    </section>
  )
}

export default ProductReview
