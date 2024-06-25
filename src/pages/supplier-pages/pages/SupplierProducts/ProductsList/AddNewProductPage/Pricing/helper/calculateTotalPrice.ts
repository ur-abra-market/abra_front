export const calculateTotalPrice = (price: number, discount: number): number => {
  let totalProductPrice = 1;

  if (discount === 0) {
    // if input number equal 0 than discount will be 0%
    totalProductPrice = price;
  } else if (discount > 100) {
    // if input number more than 100 discount number will be 100%
    totalProductPrice = price - price;
  } else {
    // if input number between 0 and 100 than discount calculate
    totalProductPrice = Number((price - (price * discount) / 100).toFixed(2));
  }

  return totalProductPrice;
};
