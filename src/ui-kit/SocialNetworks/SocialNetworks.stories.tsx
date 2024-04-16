import type { Meta, StoryObj } from '@storybook/react';

import { SocialNetworks } from './SocialNetworks';

const meta = {
  component: SocialNetworks,
  tags: ['autodocs'],
  title: 'Ui-kit/SocialNetworks',
} satisfies Meta<typeof SocialNetworks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SocialNetworksSizeS: Story = {};

export const SocialNetworksSizeM: Story = {
  args: {
    variant: 'm',
  },
};
