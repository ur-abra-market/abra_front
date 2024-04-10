import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Counter } from './Counter';

const meta = {
  component: Counter,
  tags: ['autodocs'],
  title: 'Ui-kit/Counter',
  args: {
    amount: 50,
    min_amount: 0,
    max_amount: 100,
    label: 'Bundle',
    bundles_amount: '/from 100 bundles',
  },
  argTypes: {
    amount: {
      control: {
        type: 'range',
        step: 1,
      },
    },
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BigCounter: Story = {
  args: {
    variant: 'large',
  },
};

export const SmallCounter: Story = {
  args: {
    variant: 'small',
  },
};

export const CounterWithState = (): JSX.Element => {
  const [value, setValue] = useState(5);

  const handleInputChange = (amount: number | string): void => {
    setValue(amount as number);
  };

  return (
    <Counter
      amount={value}
      min_amount={2}
      max_amount={1000}
      variant="large"
      label="Bundle"
      onChange={handleInputChange}
      bundles_amount="/from 100 bundles"
    />
  );
};
