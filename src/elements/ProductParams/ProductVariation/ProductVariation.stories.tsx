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
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
      <ProductVariation color="#BE58E1" optionNumber={2} />
      <ProductVariation color="#BE58E1" optionNumber={2} />
      <ProductVariation color="#BE58E1" optionNumber={2} />
      <ProductVariation color="#BE58E1" optionNumber={2} />
    </div>
  );
};
