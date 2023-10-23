import type { Meta, StoryObj } from '@storybook/react';

import { Title } from './Title';

const meta = {
  component: Title,
  tags: ['autodocs'],
  title: 'Components/Title',
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTitle: Story = {
  args: {
    children: "I'm Title",
  },
};
