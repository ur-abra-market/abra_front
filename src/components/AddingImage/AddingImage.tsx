import React, { FC } from 'react';

import AddingImageSpot from './AddingImageSpot/AddingImageSpot';

const AddingImage: FC = ({ logo, ...rest }): JSX.Element => {
  // const [imgUrl, setImgUrl] = useState(logo || '');

  // useEffect(() => {
  //   setImgUrl('')
  // }, [images])

  return <AddingImageSpot {...rest} logo={logo} />;
};

export default AddingImage;
