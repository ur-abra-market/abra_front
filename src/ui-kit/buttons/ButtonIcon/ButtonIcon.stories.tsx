import type { Meta, StoryObj } from '@storybook/react';

import { ButtonIcon } from './ButtonIcon';

import { GoogleIcon } from 'assets/icons';

const meta = {
  component: ButtonIcon,
  tags: ['autodocs'],
  title: 'ui-kit/ButtonIcon',
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const ButtonWithIcon: Story = {
  args: {
    children: <GoogleIcon />,
    disabled: false,
  },
};
