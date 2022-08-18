import React, { useState } from 'react'
import Flag from '../Flag';
import './ImgSlider.css'

const ImgSlider = () => {
  const photos = ['./assets/image/products/1.png', './assets/image/products/2.png', './assets/image/products/3.png', './assets/image/products/4.png'] 
  //const arrPhoto = [...photos.slice(-1), ...photos, photos[0]];
  const [slide, setSlide] = useState(0);
  const pos = 0 - (slide * 100);
 
  return (
    <div className='ImgSlider'>
      <div className='ImgSlider__window'>
        <Flag />
        <div className='ImgSlider__window_list' style={{marginLeft: `${pos}%`}} >          
          {photos.map((p, i) => (
            <img className='ImgSlider__window_list-img' key={`card_slide_${i}`} src={p} alt="img" />
          ))}          
        </div>        
      </div>  
      <div className='ImgSlider_control'>
        {photos.map((p, i) => (
          <div className='ImgSlider_control_slide'
            key={`card_photo_${i}`}
            onClick={() => setSlide(i)}
            style={{background: i===slide ? '#000000': '#828282'}} />
        ))}          
      </div>    
    </div>
  )
}

export default ImgSlider