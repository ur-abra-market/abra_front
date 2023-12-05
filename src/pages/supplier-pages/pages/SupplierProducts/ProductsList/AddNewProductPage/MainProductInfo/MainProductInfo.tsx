import { FC, useState, useEffect, ChangeEvent } from 'react';

import { Controller, useForm } from 'react-hook-form';

// import { CrossRedIcon } from 'assets/icons';
import { useAppSelector } from 'common/hooks';
import { UploadImage } from 'elements';
import { Label, Input, Select } from 'ui-kit';

import style from './MainProductInfo.module.scss';

const imagePaths = [
  'blackcrop.jpg',
  'blackdress.jpg',
  'flowerscrop.jpg',
  'whitesweat.jpg',
  'shorts.jpg',
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

  return (
    <form>
      <div className={style.main_info}>
        <Label label="Product name" htmlFor="productName">
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
        <Label label="Description" htmlFor="description">
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
        <Label label="Brand name" htmlFor="brandName">
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
          {images.map(index => (
            <div key={index} className={style.image_container}>
              <UploadImage
                key={index}
                className={style.image}
                type="product_image_supplier"
                label="General photos of the product"
                description="Product image"
              />
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
