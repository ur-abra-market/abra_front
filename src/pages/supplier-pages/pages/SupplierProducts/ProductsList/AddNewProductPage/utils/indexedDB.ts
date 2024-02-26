import { DBSchema, IDBPDatabase, openDB } from 'idb';

import { ICategoryResponse } from 'services/common/common.serviceTypes';

export enum FIELDS_NEW_PRODUCT_INFO {
  ProductName = 'productName',
  Description = 'description',
  BrandName = 'brandName',
  Images = 'images',
  ProductInfo = 'productInfo',
  productProperties = 'productProperties',
}

export interface IImages {
  id: string;
  image: string;
}

export interface IProductInfo {
  selectedCategory: number | null;
  categoryPath: ICategoryResponse[] | [];
}

export interface IProductProperties {
  name: string;
  propertyTypeId: number; // material, season and etc
  propertyValueId: number; // id of material, season. For example material > polyester
  optionalValue: number;
}

export interface IMainProductInfo {
  productName: string;
  description: string;
  brandName: string;
  images: IImages[];
  productInfo: IProductInfo;
  productProperties: IProductProperties[];
}

export interface UserDB extends DBSchema {
  productDescription: {
    key: number;
    value: {
      mainProductInfo: IMainProductInfo;
    };
  };
}

export const initDataBase = async (): Promise<IDBPDatabase<UserDB>> => {
  const db = await openDB<UserDB>('productDescriptionDataBase', 1, {
    upgrade(db) {
      db.createObjectStore('productDescription', {
        autoIncrement: true,
      }); // Specify only autoIncrement: true
    },
  });

  // Check if the product object already exists in the database
  const existingProduct = await db.get('productDescription', 1);

  if (!existingProduct) {
    // If the object does not exist, add it
    await db.put('productDescription', {
      mainProductInfo: {
        productName: '',
        description: '',
        brandName: '',
        images: [
          { id: '1', image: '' },
          { id: '2', image: '' },
          { id: '3', image: '' },
          { id: '4', image: '' },
          { id: '5', image: '' },
        ],
        productInfo: {
          selectedCategory: 0,
          categoryPath: [],
        },
        productProperties: [],
      },
    });
  }

  return db;
};

export const updateFieldInDataBase = async (
  db: IDBPDatabase<UserDB>,
  fieldToUpdate: FIELDS_NEW_PRODUCT_INFO,
  newValue: string | IImages[] | IProductInfo | IProductProperties,
): Promise<void> => {
  const tx = db.transaction('productDescription', 'readwrite');
  const store = tx.objectStore('productDescription');

  // Get the product object from the database
  try {
    const request = await store.get(1);

    if (!request) {
      return;
    }

    const product: IMainProductInfo = request.mainProductInfo;

    // Update the selected field
    switch (fieldToUpdate) {
      case FIELDS_NEW_PRODUCT_INFO.Images: {
        product[fieldToUpdate] = newValue as IImages[];
        break;
      }

      case FIELDS_NEW_PRODUCT_INFO.ProductInfo: {
        product[fieldToUpdate] = newValue as IProductInfo;
        break;
      }

      case FIELDS_NEW_PRODUCT_INFO.productProperties: {
        const newPropertyValue = newValue as IProductProperties;

        const updatedProperties = product[fieldToUpdate].map(el => {
          if (el.name === newPropertyValue.name) {
            return newPropertyValue;
          }

          return el;
        });

        if (!updatedProperties.some(el => el.name === newPropertyValue.name)) {
          updatedProperties.push(newPropertyValue);
        }
        product[fieldToUpdate] = updatedProperties;
        break;
      }

      default: {
        product[fieldToUpdate] = newValue as string;
        break;
      }
    }
    // Update the product object in the store
    await store.put({ mainProductInfo: product }, 1);
  } catch (error) {
    return;
  }

  await tx.done;
};
