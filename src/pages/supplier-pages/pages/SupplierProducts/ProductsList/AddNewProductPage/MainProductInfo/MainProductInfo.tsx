import React, { useState, useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { CrossRedIcon } from 'assets/icons';
import { useAppSelector } from 'common/hooks';
import { Label, Input, Select } from 'ui-kit';

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
  const categories = useAppSelector(state => state.common.categories);
  const businessSectorData = categories ? categories.filter(c => c.level === 1) : [];

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
        // eslint-disable-next-line no-console
        console.error('Error loading images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleRemoveImage = (index: number): void => {
    const newImages = [...images];

    newImages.splice(index, 1);
    setImages(newImages);
  };

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
                className={style.description}
              />
            )}
          />
        </Label>
        <Controller
          name="brandName"
          control={control}
          render={({ field }) => (
            <Label label="Brand name *" htmlFor="brandName">
              <Select
                {...field}
                placeholder="Select or enter brand name"
                className={style.main_select}
                options={businessSectorData.map(el => ({
                  value: el.id,
                  label: { text: el.name },
                }))}
                onChange={value => {
                  field.onChange(String(value.value));
                }}
              />
            </Label>
          )}
        />
        <Label label="General photos of the product" htmlFor="photos" />
        <div className={style.container}>
          {images.map((src, index) => (
            <div key={index} className={style.image_container}>
              <img
                key={index}
                className={style.image}
                src={src}
                alt={`product-${index + 1}`}
              />
              <div className={style.overlay}>
                <div
                  className={style.close_icon}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleRemoveImage(index)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleRemoveImage(index);
                    }
                  }}
                >
                  <CrossRedIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
