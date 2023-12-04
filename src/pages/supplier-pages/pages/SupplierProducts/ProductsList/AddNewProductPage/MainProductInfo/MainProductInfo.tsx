import { FC, useState, useEffect, ChangeEvent } from 'react';

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

export const MainProductInfo: FC = (): JSX.Element => {
  const { control } = useForm();
  const [images, setImages] = useState<string[]>([]);
  const categories = useAppSelector(state => state.common.categories);
  const brandNameData = categories ? categories.filter(c => c.level === 1) : [];
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextareaValue(event.target.value);
  };

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
          <textarea
            className={style.description}
            id="myTextarea"
            value={textareaValue}
            placeholder="Enter description"
            onChange={handleTextareaChange}
            rows={10}
            cols={10}
          />
        </Label>
        <Label label="Brand name *" htmlFor="brandName">
          <Controller
            name="brandName"
            control={control}
            render={({ field }) => (
              <div className={style.select_container}>
                <Select
                  {...field}
                  placeholder="Select or enter brand name"
                  className={style.main_select}
                  options={brandNameData.map(el => ({
                    value: el.id,
                    label: { text: el.name },
                  }))}
                  onChange={value => {
                    field.onChange(String(value.value));
                  }}
                />
              </div>
            )}
          />
        </Label>
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
              <CrossRedIcon
                className={style.overlay}
                onClick={() => handleRemoveImage(index)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleRemoveImage(index);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
