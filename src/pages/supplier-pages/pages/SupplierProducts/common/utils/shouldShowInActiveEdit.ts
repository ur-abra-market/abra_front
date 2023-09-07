export const shouldShowInActiveEdit = (
  activeProduct: number[],
  deactivatedProduct: number[],
  label: string,
): boolean => {
  const isActiveProductEmpty = activeProduct.length === 0;
  const isDeactivatedProductEmpty = deactivatedProduct.length === 0;

  if (label === 'Edit') {
    const hasSingleElementInArray =
      (activeProduct.length === 1 && deactivatedProduct.length === 0) ||
      (activeProduct.length === 0 && deactivatedProduct.length === 1);

    return !hasSingleElementInArray;
  }

  if (label === 'Activated product') {
    return !(isActiveProductEmpty && !isDeactivatedProductEmpty);
  }

  if (label === 'Deactivated product') {
    return !(isDeactivatedProductEmpty && !isActiveProductEmpty);
  }

  return false;
};
