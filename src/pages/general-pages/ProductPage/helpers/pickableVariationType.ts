import { ISelectedBundle, IProductBundle } from 'store/reducers/productSlice/types';

export const VARIATION_COLOR = ['Color'];

export const VARIATION_SIZE = [
  'Size-Women-Universal',
  'Size-Men-Universal',
  'Size-Kids-Universal',
];

export const pickableVariationType = (bundle: IProductBundle): ISelectedBundle => {
  const { name } = bundle.pickable_variations[0].variation.type;

  if (VARIATION_COLOR.includes(name)) {
    return {
      type: 'color',
      bundle,
    };
  }

  if (VARIATION_SIZE.includes(name)) {
    return {
      type: 'size',
      bundle,
    };
  }

  return {
    type: 'size',
    bundle,
  };
};
