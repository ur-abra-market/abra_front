import React, { useState, useEffect, useRef } from 'react'
import './ProductAbout.css'

const specification = {
  age_group: 'Adults', 
  gender: 'Women',
  clothing_type: 'Dress',
  dresses_length: 'Mini',
  pattern_type: 'None',
  decoration: 'None',
  weaving_method: 'Knitted',
  technics: 'Printed',
  model_number: 'DD759',
  place_of_origin: 'Turkey, Istanbul',
}
const property = {
  material: 'Cotton 90%, Elastane 10%', 
  style: 'Casual, Daily',
  season: 'Spring-Summer',
  description: 'Dresses for women from COLORITE are quality, style and lightness in perfect execution. Our floral summer dresses model SHES are made of high quality viscose and polyester, which allows your skin to breathe, the dress is absolutely weightless. Festive evening dress with long sleeves has ruffles on the cuffs and a delicate elastic band for comfortable wear, the neckline is made with a square neckline, a...',  
}
const stage = {
  supply_ability: '80000 Pieces per Month', 
  packaging: 'Separate package for item',
  processing_time: '14 day',
  delivery_time: 'Abra Shipping, ~15 days',  
}

const ProductAbout = () => {
  const targetRef = useRef();
  const [height, setHeight] = useState(0);  
  
  const transformKey = (key) => {
    return key.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');    
  }

  useEffect(() => {
    if (targetRef.current) {
      setHeight(targetRef.current.offsetHeight);
    }
  }, [targetRef]);


  return (
    <div className='ProductAbout'>
      <h2>About the product</h2>
      <div className='ProductAbout__container'>
        <div className='ProductAbout__specifications'>
          {Object.entries(specification).map(d => (
            <div className='product__specifications' key={d[0]}>
              <div className='product__specifications_key'>{transformKey(d[0])}</div>
              <div className='product__specifications_value'>{d[1]}</div>
            </div>
          ))}
        </div>
        <div className='ProductAbout__property'>
          {Object.entries(property).map(d => (
            <div className='product__property' key={d[0]}>
              <div className='product__property_key'>{transformKey(d[0])}</div>
              <div className='product__property_value' ref={targetRef}>{d[1]}</div>
              <div className= {height > 115 && d[0] === 'description' ? 'product__property_more' : 'none'}>
                View more
              </div>
            </div>
          ))}
        </div>
        <div className='ProductAbout__stage'>
          {Object.entries(stage).map(d => (
            <div className='product__stage' key={d[0]}>
              <div className='product__stage_key'>{transformKey(d[0])}</div>
              <div className='product__stage_value'>{d[1]}</div>             
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductAbout