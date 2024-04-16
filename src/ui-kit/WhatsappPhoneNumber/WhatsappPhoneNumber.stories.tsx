import type { Meta, StoryObj } from '@storybook/react';

import { WhatsappPhoneNumber } from './WhatsappPhoneNumber';

const meta = {
  component: WhatsappPhoneNumber,
  tags: ['autodocs'],
  title: 'Ui-kit/WhatsappPhoneNumber',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof WhatsappPhoneNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultWhatsappPhoneNumber: Story = {};
