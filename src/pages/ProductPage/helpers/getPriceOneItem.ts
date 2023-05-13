export const getPriceOneItem = (params: any): any => {
  const { prices } = params;

  // заглушка так как нет данных
  if (!prices[0].discount || !prices[0].min_quantity) return 'not data';

  const price = parseFloat(prices[0].discount) / prices[0].min_quantity;

  return price.toFixed(2);
};
