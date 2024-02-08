import { FC } from 'react';

import { UploadImage } from 'elements';

import style from './ImageContainer.module.scss';

interface IImage {
  id?: number;
  image?: string;
  uploadImage: (image: File) => void;
  deleteImage?: (id: number) => void;
  lastImage: boolean;
}

export const ImageContainer: FC<IImage> = ({
  id,
  image,
  uploadImage,
  deleteImage,
  lastImage,
}): JSX.Element => {
  const deleteImageHandler = (): void => {
    console.log('deleteHANDLER', id);
    if (id && deleteImage) {
      deleteImage(id);
    }
  };

  console.log(lastImage);

  return (
    <div className={style.image_container}>
      <UploadImage
        image={image || ''}
        uploadImage={uploadImage}
        deleteImage={deleteImageHandler}
        className={style.image}
        type="product_image_supplier"
        label="General photos of the product"
        description="Product image"
      />
      {!image && !lastImage && <span className={style.upload}>Upload</span>}
      {lastImage && (
        <span className={style.upload_more}>
          Upload
          <br /> More
        </span>
      )}
    </div>
  );
};
