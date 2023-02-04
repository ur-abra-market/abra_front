import React, { FC, useState } from 'react';

import AddingImageSpot from './AddingImageSpot';

const AddingImage: FC<AddingImageSpotProps> = ({ logo, ...rest }): JSX.Element => {
  const [imgUrl, setImgUrl] = useState(logo || '');

  // useEffect(() => {
  //   setImgUrl('')
  // }, [images])

  return <AddingImageSpot {...rest} imgUrl={imgUrl} setImgUrl={setImgUrl} />;
};

export default AddingImage;
