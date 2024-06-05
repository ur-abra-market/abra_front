import React, { FC, useEffect, useState } from 'react';

import { BundleAdder } from './BundleAdder/BundleAdder';
import { bundleColor, bundleSize } from './mockData/mockData';

import { ProductColor } from 'pages/general-pages/ProductPage/components/ProductParams/ProductColor/ProductColor';
import { ProductSizeList } from 'pages/general-pages/ProductPage/components/ProductParams/ProductSizeList/ProductSizeList';
import { ISelectOption, Label, Select } from 'ui-kit';

import style from './Bundles.module.scss';

const nameData = [
  { name: 'Size', id: 1 },
  { name: 'Color', id: 2 },
];
const date = Number(new Date());

export const Bundles: FC = (): JSX.Element => {
  const [bundles, setBundle] = useState([
    {
      name: 'Bundle 1',
      id: 1,
      selected: true,
      variation: [{ id: 1 }],
      sizeOrColor: [{ id: 1, quantity: 11 }],
    },
    {
      name: 'Bundle 2',
      id: 2,
      selected: false,
      variation: [{ id: 2 }],
      sizeOrColor: [{ id: 2, quantity: 12 }],
    },
  ]);

  useEffect(() => {
    setBundle(prevBundles => {
      const newBundles = prevBundles.map(bundle => ({ ...bundle, selected: false }));

      newBundles[0].selected = true;

      return newBundles;
    });
  }, []);
  const handleSelectColorOrSize = (id: number, quantity: number): void => {
    const updatedBundles = bundles.map(bundle => {
      if (bundle.selected) {
        const sizeExists = bundle.sizeOrColor?.some(sizeItem => sizeItem.id === id);

        const newSizeOrColor = sizeExists
          ? bundle.sizeOrColor.filter(sizeItem => sizeItem.id !== id)
          : [...(bundle.sizeOrColor || []), { id, quantity }];

        return {
          ...bundle,
          sizeOrColor: newSizeOrColor,
        };
      }

      return bundle;
    });

    setBundle(updatedBundles);
  };
  const handleAddBundle = (): void => {
    setBundle(prevBundles => {
      const newBundles = prevBundles.map(bundle => ({ ...bundle, selected: false }));

      return [
        ...newBundles,
        {
          name: 'new bundle',
          id: 3 + date,
          selected: true,
          variation: [{ id: 0 }],
          sizeOrColor: [],
        },
      ];
    });
  };
  const handleDeleteBundle = (id: number): void => {
    setBundle(bundles.filter(bundle => bundle.id !== id));
  };
  const handleSelectBundle = (id: number): void => {
    setBundle(
      bundles.map(bundle => {
        if (bundle.id === id) {
          return { ...bundle, selected: true };
        }

        return { ...bundle, selected: false };
      }),
    );
  };
  const handleChangeName = (id: number, name: string): void => {
    setBundle(
      bundles.map(bundle => {
        if (bundle.id === id) {
          return { ...bundle, name };
        }

        return bundle;
      }),
    );
  };
  const handleVariationChange = (selectedOption: ISelectOption): void => {
    setBundle(prevBundles =>
      prevBundles.map(bundle =>
        bundle.selected
          ? { ...bundle, variation: [{ id: selectedOption.value as number }] }
          : bundle,
      ),
    );
    setBundle(prevBundles =>
      prevBundles.map(bundle => ({
        ...bundle,
        sizeOrColor: [],
      })),
    );
  };

  return (
    <div>
      <BundleAdder
        handleSelectBundle={handleSelectBundle}
        handleDeleteBundle={handleDeleteBundle}
        handleChangeName={handleChangeName}
        handleAddBundle={handleAddBundle}
        bundles={bundles}
      />
      <Label label="Variation type">
        <div>
          <Select
            placeholder="Select variation type"
            defaultValue={bundles.find(el => el.selected)?.variation[0].id}
            className={style.select_input}
            onChange={handleVariationChange}
            options={nameData.map(el => ({
              value: el.id,
              label: { text: el.name },
            }))}
          />
        </div>
      </Label>
      <div className={style.items}>
        {bundles.find(el => el.selected)?.variation[0].id === 1 && (
          <ProductSizeList
            bundle={bundleSize}
            bundleType="color"
            handleSelectColorOrSize={handleSelectColorOrSize}
            selectedId={bundles.find(el => el.selected)?.sizeOrColor}
            isBundles
          />
        )}
        {bundles.find(el => el.selected)?.variation[0].id === 2 && (
          <ProductColor
            bundleType="size"
            bundle={bundleColor}
            handleSelectColorOrSize={handleSelectColorOrSize}
            selectedId={bundles.find(el => el.selected)?.sizeOrColor}
            isBundles
          />
        )}
      </div>
    </div>
  );
};
