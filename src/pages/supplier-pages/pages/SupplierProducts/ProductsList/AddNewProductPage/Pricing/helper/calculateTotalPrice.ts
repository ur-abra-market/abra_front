export const calculateTotalPrice = (
  price: number,
  discountProductVariationPrice: number,
): number => {
  let totalProductPrice = 1;

  if (discountProductVariationPrice === 0) {
    totalProductPrice = price;
  } else if (discountProductVariationPrice > 100) {
    totalProductPrice = price - price;
  } else {
    totalProductPrice = Number(
      (price - (price * discountProductVariationPrice) / 100).toFixed(2),
    );
  }

  return totalProductPrice;
};
