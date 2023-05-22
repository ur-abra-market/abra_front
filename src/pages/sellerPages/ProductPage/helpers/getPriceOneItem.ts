import { IProductPrice } from 'common/types/interfaces';

export const getPriceOneItem = (params: IProductPrice[]): any => {
  const { discount, min_quantity } = params[0];

  if (!discount || !min_quantity) return 'no data available';

  const price = parseFloat(discount.toString()) / min_quantity;

  return price.toFixed(2);
};
