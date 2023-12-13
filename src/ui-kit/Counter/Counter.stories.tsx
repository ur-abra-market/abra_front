import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Counter } from './Counter';

const meta = {
  component: Counter,
  tags: ['autodocs'],
  title: 'Components/Counter',
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BigCounter: Story = {
  args: {
    variant: 'large',
    amount: 200,
    onIncrementHandler: () => {},
    onDecrementHandler: () => {},
  },
};

export const SmallCounter: Story = {
  args: {
    variant: 'small',
    amount: 134,
    onIncrementHandler: () => {},
    onDecrementHandler: () => {},
  },
};
export const CounterWithState = (): JSX.Element => {
  const [value, setValue] = useState<number>(10);

  if (value < 1) {
    setValue(1);
  }

  return (
    <Counter
      amount={value}
      variant="large"
      onDecrementHandler={value => setValue(value + 1)}
      onIncrementHandler={value => setValue(value - 1)}
    />
  );
};
