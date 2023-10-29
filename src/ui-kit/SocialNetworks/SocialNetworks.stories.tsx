import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { SocialNetworks } from './SocialNetworks';

const meta = {
  component: SocialNetworks,
  tags: ['autodocs'],
  title: 'ui-kit/SocialNetworks',
} satisfies Meta<typeof SocialNetworks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSocialNetworks: Story = {
  render: () => {
    return <SocialNetworks />;
  },
};

export const SocialNetworksSizeS: Story = {
  render: () => {
    return <SocialNetworks variant="s" />;
  },
};

export const SocialNetworksSizeM: Story = {
  render: () => {
    return <SocialNetworks variant="m" />;
  },
};
