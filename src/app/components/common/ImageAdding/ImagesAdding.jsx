import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ImageAdding from './index'

export const ImagesAdding = ({ images, setImages }) => {
  const [imageUrl, setImageUrl] = useState('')

  return (
    <ImageAdding
      images={images}
      setImages={setImages}
      imgUrl={imageUrl}
      setImgUrl={setImageUrl}
    />
  )
}

ImagesAdding.propTypes = {
  images: PropTypes.array,
  setImages: PropTypes.func
}
