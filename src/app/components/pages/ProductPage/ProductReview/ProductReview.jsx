import React from 'react'
import style from './ProductReview.module.css'
import {Link} from 'react-router-dom'
import {
    getPercentagesOfTotalCountReview
} from '../helpers/getPercentagesOfTotalCountReview'
import Stars from '../../../common/Stars'
import {useSelector} from 'react-redux'



const ProductReview = () => {
    const {gradesData} = useSelector(state => state.targetProduct)


    if(!gradesData)
        return null

    return <section>
        <h2 className={style.title}>Feedbacks</h2>
        <Link to='/' className={style.link}>See all</Link>
        <div className={style.wrapper}>
            <div className={style.grade}>
                <div className={style['stars-block']}>
                    <Stars reward={parseFloat(gradesData?.grade_average) || 0}/>
                    <span>
                        {gradesData?.grade?.grade_average + ' / ' + gradesData?.grade?.count + ' reviews'}
                    </span>
                </div>
                {gradesData?.grade_details.map(({grade, count}) => {
                    return <div key={grade} className={style['rating-line']}>
                        <span>
                            {grade + ' stars'}
                        </span>
                        <span className={style.line}>
                            <span className={style['line-accent']}
                                  style={{
                                      width: getPercentagesOfTotalCountReview({
                                          totalCount: gradesData?.grade?.count,
                                          itemCount: count
                                      })
                                  }}/>
                        </span>
                        <span>
                            {count}
                        </span>
                    </div>
                })}
            </div>
            <div className={style['image-list']}>

                <div className={style.image}>

                </div>
                <div className={style.image}>

                </div>
                <div className={style.image}>

                </div>


            </div>


        </div>

    </section>
}

export default ProductReview
