import type { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from './Paragraph';

const meta = {
  component: Paragraph,
  tags: ['autodocs'],
  title: 'Components/Paragraph',
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultParagraph: Story = {
  args: {
    children: 'Paragraph',
  },
};
