export const shouldShowInActiveEdit = (
  selectedProduct: number[],
  unselectedProduct: number[],
  label: string,
): boolean => {
  const isSelectedProductEmpty = selectedProduct.length === 0;
  const isUnselectedProductEmpty = unselectedProduct.length === 0;

  if (label === 'Edit') {
    const hasSingleElementInArray =
      (selectedProduct.length === 1 && unselectedProduct.length === 0) ||
      (selectedProduct.length === 0 && unselectedProduct.length === 1);

    return !hasSingleElementInArray;
  }

  if (label === 'Activated product') {
    return !(isSelectedProductEmpty && !isUnselectedProductEmpty);
  }

  if (label === 'Deactivated product') {
    return !(isUnselectedProductEmpty && !isSelectedProductEmpty);
  }

  return false;
};
