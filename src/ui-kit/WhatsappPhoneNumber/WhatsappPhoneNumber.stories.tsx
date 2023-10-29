import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { WhatsappPhoneNumber } from './WhatsappPhoneNumber';

const meta = {
  component: WhatsappPhoneNumber,
  tags: ['autodocs'],
  title: 'ui-kit/WhatsappPhoneNumber',
} satisfies Meta<typeof WhatsappPhoneNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultWhatsappPhoneNumber: Story = {
  render: () => {
    return <WhatsappPhoneNumber />;
  },
};
