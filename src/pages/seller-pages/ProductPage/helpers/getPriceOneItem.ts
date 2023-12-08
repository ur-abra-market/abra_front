import { IProductPrice } from 'services/product/product.serviceTypes';

export const getPriceOneItem = (params: IProductPrice[]): any => {
  const { discount, min_quantity } = params[0];
  // TODO waiting news about price
  // const discount = 1000 * Math.random();
  // const min_quantity = 10; // TODO

  if (!discount || !min_quantity) return 'no data available';

  const price = parseFloat(discount.toString()) / min_quantity;

  return price.toFixed(2);
};
