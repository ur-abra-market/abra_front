import type { Meta, StoryObj } from '@storybook/react';

import { ButtonQuestion } from './ButtonQuestion';

const meta = {
  component: ButtonQuestion,
  tags: ['autodocs'],
  title: 'Components/ButtonQuestion',
} satisfies Meta<typeof ButtonQuestion>;

export default meta;
type Story = StoryObj<typeof ButtonQuestion>;

export const Question: Story = {
  render: () => <ButtonQuestion />,
};
