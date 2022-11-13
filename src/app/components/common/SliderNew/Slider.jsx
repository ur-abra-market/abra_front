import React, {useState} from 'react'
import PropTypes from 'prop-types'
import style from './Slider.module.css'
import {Link} from 'react-router-dom'
import ImgSlider from '../ImgSlider'
import Stars from '../Stars'
import testImg from './testSimilarImg.jpg'
//import nonePng from './../../../assets/img/icons/none.png'

const Slider = ({title, dataArr}) => {
    console.log('slider', dataArr)

    const widthCart = 220
    const gap = 11
    const step = widthCart + gap
    const widthList = dataArr.length * widthCart + (dataArr.length - 1) * gap
    const widthSlider = 1376
    const dl = widthSlider - widthList
    const [left, setLeft] = useState(0)

    const move = (d) => {
        const newleft = left + d
        const dLeft = newleft > 0 ? 0 : newleft < dl ? dl : newleft
        setLeft(dLeft)
    }

    const buildCarousel = () => {
        return dataArr.map((data, index) => {


            // const image = props.images.length ? [props.images[0]] : props.images
            const image = Array.isArray(data?.images) ? data.images[0] : data?.images ? data.images : testImg

            console.log('card', data)
            return (
                <div className={style.card} key={data.id + '-' + index}>
                    <Link to={'/product/' + data.id}>
                        <ImgSlider srcArr={image}/>
                    </Link>
                    <div className={style.card__direction}>
                        <span>{data?.name}</span>
                    </div>
                    <div className={style.card__price}>
                        <div className={style.amount}>${data?.with_discount}/pc</div>
                        <span>{`/from ${data?.with_discount} pcs`}</span>
                    </div>
                    <Stars reward={+data?.grade_average || 2}/>
                </div>


            )
        })
    }

    return (
        <div className={style.slider}>
            <div className={style.slider__control}>
                <div className={style.slider__name}>
                    <h2>{title}</h2>
                    <span>See all</span>
                </div>
                <div className={style.slider__btn}>
                    <div
                        className={style.slider__btn_left}
                        onClick={() => move(step)}
                    ></div>
                    <div
                        className={style.slider__btn_right}
                        onClick={() => move(-step)}
                    ></div>
                </div>
            </div>
            <div className={style.slider__card}>
                <div className={style.slider__card_list} style={{left: `${left}px`}}>
                    {buildCarousel()}
                </div>
            </div>
        </div>
    )
}

Slider.propTypes = {
    title: PropTypes.string,
    dataArr: PropTypes.array
}
export default Slider

