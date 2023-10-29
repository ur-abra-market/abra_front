import type { Meta, StoryObj } from '@storybook/react';

import { AccountManagementLink } from './AccountManagmentLink/AccountManagmentLink';

const meta = {
  component: AccountManagementLink,
  tags: ['autodocs'],
  title: 'Components/AccountManagement',
} satisfies Meta<typeof AccountManagementLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultAccountManagement: Story = {
  args: {
    linkLabel: 'Change your email',
    path: '/',
    description: '(You will have to confirm a new email)',
  },
  render: () => (
    <>
      <AccountManagementLink
        linkLabel="Change your email"
        path="/change_email"
        description="(You will have to confirm a new email)"
      />
      <AccountManagementLink
        linkLabel="Change your password"
        path="/change_password"
        description="(In case if you forgot a current password or need a stronger one)"
      />
      <AccountManagementLink
        linkLabel="Remove the account"
        path="/"
        description="(All your data including order history will be deleted)"
      />
    </>
  ),
};
