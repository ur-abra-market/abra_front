import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ProductVariation } from './ProductVariation';

const meta = {
  component: ProductVariation,
  tags: ['autodocs'],
  title: 'Components/ProductVariation',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductVariation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Deffault: Story = {
  args: {
    color: '#BE58E1',
    optionNumber: 1,
  },
};
export const Deffault2: StoryFn = () => {
  const options = [
    { id: 1, color: '#BE58E1', optionNumber: 1 },
    { id: 1, color: '#FACD58', optionNumber: 4 },
    { id: 1, color: '#4B68B2', optionNumber: 3 },
    { id: 1, color: '#4DB24B', optionNumber: 5 },
  ];

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      {options.map(option => (
        <ProductVariation
          key={option.id}
          color={option.color}
          optionNumber={option.optionNumber}
        />
      ))}
    </div>
  );
};
