import { FC, useState, ChangeEvent } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { ImageContainer } from './components/ImageContainer/ImageContainer';

import { useAppSelector } from 'common/hooks';
import { Label, Input, Select } from 'ui-kit';

import style from './MainProductInfo.module.scss';

const imagePaths = ['', '', '', '', ''];

export const MainProductInfo: FC = (): JSX.Element => {
  const { control } = useForm();
  const [images, setImages] = useState<string[]>(imagePaths);
  const categories = useAppSelector(state => state.common.categories);
  const brandNameData = categories ? categories.filter(c => c.level === 1) : [];
  const [textareaValue, setTextareaValue] = useState<string>('');

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextareaValue(event.target.value);
  };

  function encodeImageFileAsURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = function () {
        resolve(reader.result as string);
      };

      reader.onerror = function () {
        reject(reader.error);
      };

      reader.readAsDataURL(file);
    });
  }

  // useEffect(() => {
  //   const fetchImages = async (): Promise<void> => {
  //     try {
  //       const loadedImages = await Promise.all(
  //         imagePaths.map(async path => {
  //           const module = await import(`assets/images/files/${path}`);
  //
  //           return module.default;
  //         }),
  //       );
  //
  //       console.log(loadedImages);
  //       setImages(loadedImages);
  //     } catch (error) {
  //       // eslint-disable-next-line no-console
  //       console.error('Error loading images:', error);
  //     }
  //   };
  //
  //   fetchImages();
  // }, []);

  const uploadImageHandler = async (image: File): Promise<void> => {
    const imageBase64 = await encodeImageFileAsURL(image);

    setImages(prev => [...prev, imageBase64]);
  };

  const deleteImageHandler = (id: number): void => {
    console.log('delete', id);
    const newImages = images.filter(image => image !== images[id]);

    setImages(newImages);
  };

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
          {images.map((image, index) => (
            <ImageContainer
              key={index}
              id={index}
              image={image}
              lastImage={images.length - 1 === index}
              uploadImage={uploadImageHandler}
              deleteImage={deleteImageHandler}
            />
          ))}
        </div>
      </div>
    </form>
  );
};
