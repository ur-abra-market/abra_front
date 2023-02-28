export const getPriceOneItem = (params: any): any => {
  const { price_include_discount, min_quantity } = params;

  // заглушка так как нет данных
  if (!price_include_discount || !min_quantity) return 'not data';

  const price = parseFloat(price_include_discount.replace(/,/g, '')) / min_quantity;

  return price.toFixed(2);
};
