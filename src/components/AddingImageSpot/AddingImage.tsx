import React, { useState } from 'react';

import PropTypes from 'prop-types';

import AddingImageSpot from './AddingImageSpot';

const AddingImage = ({ logo, ...rest }) => {
  const [imgUrl, setImgUrl] = useState(logo || '');

  // useEffect(() => {
  //   setImgUrl('')
  // }, [images])

  return <AddingImageSpot {...rest} imgUrl={imgUrl} setImgUrl={setImgUrl} />;
};

AddingImage.propTypes = {
  images: PropTypes.array,
  logo: PropTypes.string,
};
export default AddingImage;
