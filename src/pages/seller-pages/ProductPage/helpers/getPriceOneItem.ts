import { IProductPrice } from 'services/product/product.serviceTypes';

export const getPriceOneItem = (params: IProductPrice[]): any => {
  // const { discount, min_quantity } = params[0];
  const discount = 0.22;
  const min_quantity = 22; // TODO

  if (!discount || !min_quantity) return 'no data available';

  const price = parseFloat(discount.toString()) / min_quantity;

  return price.toFixed(2);
};
