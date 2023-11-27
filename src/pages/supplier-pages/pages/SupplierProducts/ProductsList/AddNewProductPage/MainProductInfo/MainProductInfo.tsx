import React, { useState, useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Label, Input } from 'ui-kit';

import style from './MainProductInfo.module.scss';

const imagePaths = [
  'whitesweat.jpg',
  'blackdress.jpg',
  'shorts.jpg',
  'flowerscrop.jpg',
  'blackcrop.jpg',
];

export const MainProductInfo: React.FC = () => {
  const { control } = useForm();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async (): Promise<void> => {
      try {
        const loadedImages = await Promise.all(
          imagePaths.map(async path => {
            const module = await import(`assets/images/files/${path}`);

            return module.default;
          }),
        );

        setImages(loadedImages);
      } catch (error) {
        // console.error('Error loading images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <form>
      <div className={style.main_info}>
        <Label label="Product name *" htmlFor="productName">
          <Controller
            name="productName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter the product name"
                className={style.main_product}
              />
            )}
          />
        </Label>
        <Label label="Description *" htmlFor="description">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter description"
                className={style.main_product}
              />
            )}
          />
        </Label>
        <Label label="Brand name *" htmlFor="brandName">
          <Controller
            name="brandName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Select or enter brand name"
                className={style.main_product}
              />
            )}
          />
        </Label>
        <Label label="General photos of the product" htmlFor="photos" />
        {images.map((src, index) => (
          <img
            key={index}
            className={style.image}
            src={src}
            alt={`product-${index + 1}`}
          />
        ))}
      </div>
    </form>
  );
};
