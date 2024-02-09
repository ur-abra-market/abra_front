export const calculateTotalPrice = (
  price: number,
  discountProductVariationPrice: number,
): number => {
  let totalProductPrice = 1;

  if (discountProductVariationPrice === 0) {
    // if input number equal 0 than discount will be 0%
    totalProductPrice = price;
  } else if (discountProductVariationPrice > 100) {
    // if input number more than 100 discount number will be 100%
    totalProductPrice = price - price;
  } else {
    // if input number between 0 and 100 than discount calculate
    totalProductPrice = Number(
      (price - (price * discountProductVariationPrice) / 100).toFixed(2),
    );
  }

  return totalProductPrice;
};
