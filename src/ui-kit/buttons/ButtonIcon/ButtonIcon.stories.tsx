import type { Meta, StoryObj } from '@storybook/react';

import { ButtonIcon } from './ButtonIcon';

import { GoogleIcon } from 'assets/icons';

const meta = {
  component: ButtonIcon,
  tags: ['autodocs'],
  title: 'Ui-kit/Buttons/ButtonIcon',
  args: {
    children: <GoogleIcon />,
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const ButtonWithIcon: Story = {};
