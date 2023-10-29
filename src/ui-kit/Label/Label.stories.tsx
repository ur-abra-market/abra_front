import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';

import { Input } from 'ui-kit/Input/Input';

const meta = {
  component: Label,
  tags: ['autodocs'],
  title: 'ui-kit/Label',
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLabel: Story = {
  args: {
    label: 'Input Field',
    children: <Input style={{ width: '20%' }} />,
  },
};
