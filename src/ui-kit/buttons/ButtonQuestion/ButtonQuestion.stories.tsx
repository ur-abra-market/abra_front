import type { Meta, StoryObj } from '@storybook/react';

import { ButtonQuestion } from './ButtonQuestion';

const meta = {
  component: ButtonQuestion,
  tags: ['autodocs'],
  title: 'Ui-kit/Buttons/ButtonQuestion',
} satisfies Meta<typeof ButtonQuestion>;

export default meta;
type Story = StoryObj<typeof ButtonQuestion>;

export const Question: Story = {
  render: () => <ButtonQuestion />,
};
