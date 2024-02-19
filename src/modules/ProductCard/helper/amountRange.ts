export const amountRange = (minPrice: number, maxPrice: number): string => {
  if (minPrice === maxPrice) {
    return `$${minPrice.toFixed(2)}`;
  }

  return `$${minPrice.toFixed(2)}-${maxPrice.toFixed(2)}`;
};
