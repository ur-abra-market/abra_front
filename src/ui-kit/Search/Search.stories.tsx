import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Search } from './Search';

const meta = {
  component: Search,
  tags: ['autodocs'],
  title: 'Components/Search',
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSearch: Story = {
  render: () => {
    return <Search placeholder="Search" />;
  },
};
