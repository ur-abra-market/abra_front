import type { Meta, StoryObj } from '@storybook/react';

import { MainLogo } from './MainLogo';

const meta = {
  component: MainLogo,
  tags: ['autodocs'],
  title: 'Ui-kit/MainLogo',
} satisfies Meta<typeof MainLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLogo: Story = {};

export const LogoSizeM: Story = {
  args: {
    variant: 'm',
  },
};
