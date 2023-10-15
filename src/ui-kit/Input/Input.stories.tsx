import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

import { EyeHiddenIcon } from 'assets/icons';
import { ButtonIcon } from 'ui-kit/buttons/ButtonIcon/ButtonIcon';

import styles from './Input.module.scss';

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    defaultValue: 'Some text',
  },
};

export const Password = {
  render: () => {
    return <Input type="password" variant="password" placeholder="********" />;
  },
};

export const Invalid: Story = {
  args: {
    variant: 'primary',
    defaultValue: 'Invalid text',
    error: 'Some error',
  },
};
