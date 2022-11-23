import React from 'react'
import style from '../ProductPage.module.css'
import ProductPath from '../../../ui/product/ProductPath'
import ProductPhoto from '../../../ui/product/ProductPhoto'
import Reward from '../../../ui/product/Reward'
import FlagFavorites from '../../../ui/product/FlagFavorites'
import ChoiceProduct from '../../../ui/product/ChoiceProduct'
import ProductStatistics from '../../../ui/product/ProductStatistics'
import StatusSeller from '../../../ui/product/StatusSeller'
import PropTypes from 'prop-types'
import {PlusIcon} from '../../../../assets/img'


const ProductInfo = ({product}) => {
    const {category_path, tags, photoAll, grade, close,
        is_favorite, supplier_info, addOrRemoveProductFavorites,
        product_name, colors, sizes, daily_actual_demand, prices,
        monthly_actual_demand } = product


    return (
        <div className={style.productPage__basic} >
            <button style={{position: 'absolute',
                right: -56, top: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40,
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: 'white'}} onClick={() => {
                close(false)
                }
            }><PlusIcon /></button>
            <div className={style.productPage__basic_left}>
                <ProductPath
                    pathArr={[category_path, '/Dress', '/Spring-Summer']}/>
                <ProductPhoto photoArray={photoAll}/>
            </div>
            <div className={style.productPage__basic_right}>
                <div className={style.productPage__basic_top}>
                    <Reward star grade={grade}/>
                    <FlagFavorites active={is_favorite}
                                   onClick={addOrRemoveProductFavorites}/>
                </div>
                <h2>
                    <span>{product_name}</span>
                </h2>
                <div className={style.productPage__basic_block1}>
                    <div className={style.productPage__basic_path}>
                        {tags?.map(tag => <p key={tag}>{tag}</p>)}
                    </div>
                </div>
                <div className={style.productPage__basic_block2}>
                    <ChoiceProduct
                        colors={colors.length !== 0 ? colors : ['red', 'blue', 'black', 'beige']}/>
                    <ProductStatistics
                        sizes={sizes.length !== 0 ? sizes : ['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                        dailyActualDemand={daily_actual_demand}
                        prices={prices[0]}
                        monthlyActualDemand={monthly_actual_demand}/>

                </div>
                <button className={style.productPage__button}>Add to Cart</button>
                <div className={style.productPage__line}/>
                <StatusSeller supplierInfo={supplier_info}/>
            </div>
        </div>
    )
}

export default ProductInfo

ProductInfo.propTypes = {
    product: PropTypes.object.isRequired
}