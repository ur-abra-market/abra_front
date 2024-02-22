import { DBSchema, IDBPDatabase, openDB } from 'idb';

export enum FIELDS_NEW_PRODUCT_INFO {
  ProductName = 'productName',
  Description = 'description',
  BrandName = 'brandName',
  Images = 'images',
}

export interface IImages {
  id: string;
  image: string;
}

export interface IMainProductInfo {
  productName: string;
  description: string;
  brandName: string;
  images: IImages[];
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
      },
    });
  }

  return db;
};

export const updateFieldInDataBase = async (
  db: IDBPDatabase<UserDB>,
  fieldToUpdate: FIELDS_NEW_PRODUCT_INFO,
  newValue: string | IImages[],
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
    if (fieldToUpdate === 'images') {
      product[fieldToUpdate] = newValue as IImages[];
    } else {
      product[fieldToUpdate] = newValue as string;
    }
    // Update the product object in the store
    await store.put({ mainProductInfo: product }, 1);
  } catch (error) {
    return;
  }

  await tx.done;
};
