import type { Meta, StoryObj } from '@storybook/react';

import { MainLogo } from './MainLogo';

const meta = {
  component: MainLogo,
  tags: ['autodocs'],
  title: 'Components/MainLogo',
} satisfies Meta<typeof MainLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLogo: Story = {};

export const SecondaryLogo: Story = {
  args: {
    variant: 'm',
  },
};
