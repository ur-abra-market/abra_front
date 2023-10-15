import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';

import { Input } from 'ui-kit/Input/Input';

import styles from 'ui-kit/Input/Input.module.scss';

const meta = {
  component: Label,
  tags: ['autodocs'],
  title: 'Components/Label',
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLabel: Story = {
  args: {
    label: 'Input Field',
    children: <Input style={{ width: '20%' }} />,
  },
};
