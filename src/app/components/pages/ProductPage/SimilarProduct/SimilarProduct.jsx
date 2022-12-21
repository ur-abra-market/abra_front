import {Carousel} from '../../../common'
import React from 'react'
import style from '../ProductPage.module.css'
import Flag from '../../../common/Flag'
import {ReactComponent as LoupeIcon} from '../../../../assets/img/icons/loupe.svg'
import {Link} from 'react-router-dom'
import Stars from '../../../common/Stars'
import {useSelector} from 'react-redux'
import {getPriceOneItem} from '../helpers/getPriceOneItem'


export const SimilarProduct = () => {
    const {similarProducts} = useSelector(state => state.similarProducts)

    if(!similarProducts)
        return null

    const buildCarouselSimilarProducts = () => {
        return similarProducts && similarProducts.map((data, index) => {
            const {
                name,
                price_include_discount,
                //total_orders,
                image_url,
                //supplier_id,
                description,
                id,
                min_quantity,
                grade_average
            } = data
            return (
                <div className={style.card} key={id + '-' + index}>
                    <div className={style.card__image}>
                        <Flag className={style.card__flag}/>
                        <img src={image_url} alt={name}/>
                        <span className={style.card__hover}>
                            <span className={style['card__hover-text']}>
                                <LoupeIcon/>
                                <span>Quick View</span>
                            </span>
                        </span>
                    </div>
                    <Link to={'/product/' + id} className={style.card__link}>
                        <div className={style.card__direction}>
                            <span>{name}</span>
                            <span>{description}</span>
                        </div>
                    </Link>
                    <div className={style.card__price}>
                        <div className={style.amount}>
                            {getPriceOneItem({price_include_discount, min_quantity})}/pc
                        </div>
                        <span>{`/from ${min_quantity} pcs`}</span>
                    </div>
                    <Stars reward={parseFloat(grade_average) || 0}/>
                </div>
            )
        })
    }

    return (
        <>
            <Carousel title='Similar products in this category'
                      arrayLength={similarProducts.length}>
                {buildCarouselSimilarProducts()}
            </Carousel>
        </>
    )
}