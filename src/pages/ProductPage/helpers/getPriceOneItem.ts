import { IPriceProd } from 'interfaces';

export const getPriceOneItem = (params: IPriceProd[]): any => {
  const { discount, min_quantity } = params[0];

  if (!discount || !min_quantity) return 'no data available';

  const price = parseFloat(discount.toString()) / min_quantity;

  return price.toFixed(2);
};
