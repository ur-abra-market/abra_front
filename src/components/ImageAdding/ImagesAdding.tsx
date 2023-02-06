import React, { FC, useState } from 'react';

import ImageAdding from './index';

interface ImagesAddingProps {
  images: any[];
  setImages: Function;
}
export const ImagesAdding: FC<ImagesAddingProps> = ({
  images,
  setImages,
}): JSX.Element => {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageAdding
      images={images}
      setImages={setImages}
      imgUrl={imageUrl}
      setImgUrl={setImageUrl}
    />
  );
};
