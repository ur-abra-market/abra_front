import React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Label, Input } from 'ui-kit';

export const MainProductInfo: React.FC = () => {
  const { control } = useForm();

  return (
    <form>
      <div>
        <Label label="Product name *" htmlFor="productName">
          <Controller
            name="productName"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter the product name" />
            )}
          />
        </Label>
        <Label label="Description *" htmlFor="description">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Enter description" />}
          />
        </Label>
        <Label label="Brand name *" htmlFor="brandName">
          <Controller
            name="brandName"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Select or enter brand name" />
            )}
          />
        </Label>
      </div>
    </form>
  );
};
