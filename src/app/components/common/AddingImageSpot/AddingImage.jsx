import React, { useState } from 'react'
import AddingImageSpot from './AddingImageSpot'
import PropTypes from 'prop-types'

const AddingImage = ({ logo, ...rest }) => {
  const [imgUrl, setImgUrl] = useState(logo ? logo : '')

  // useEffect(() => {
  //   setImgUrl('')
  // }, [images])

  return <AddingImageSpot {...rest} imgUrl={imgUrl} setImgUrl={setImgUrl} />
}

AddingImage.propTypes = {
  images: PropTypes.array,
  logo: PropTypes.string
}
export default AddingImage
