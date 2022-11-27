import React, { useEffect, useState } from 'react'
import AddingImageSpot from './AddingImageSpot'
import PropTypes from 'prop-types'

const AddingImage = ({ ...props }) => {
  const { images } = props
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    setImgUrl('')
  }, [images])

  return <AddingImageSpot {...props} imgUrl={imgUrl} setImgUrl={setImgUrl} />
}

AddingImage.propTypes = {
  images: PropTypes.array
}
export default AddingImage
