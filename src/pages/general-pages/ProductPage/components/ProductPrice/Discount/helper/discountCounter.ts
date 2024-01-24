export const discountCounter = (value: number, discount: number): number => {
  return value - (value * (discount * 100)) / 100;
};
