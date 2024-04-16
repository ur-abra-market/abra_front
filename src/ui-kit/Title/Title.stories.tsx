import type { Meta, StoryObj } from '@storybook/react';

import { Title } from './Title';

const meta = {
  component: Title,
  tags: ['autodocs'],
  title: 'Ui-kit/Title',
  args: {
    children: "I'm Title",
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeXs: Story = {
  args: {
    size: 'xs',
  },
};
export const SizeS: Story = {
  args: {
    size: 's',
  },
};
export const SizeM: Story = {
  args: {
    size: 'm',
  },
};
export const SizeL: Story = {
  args: {
    size: 'l',
  },
};
export const SizeXL: Story = {
  args: {
    size: 'xl',
  },
};
