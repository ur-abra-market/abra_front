import React from 'react';

import { AccountManagementLink } from './AccountManagmentLink/AccountManagmentLink';

export const AccountManagement = (): JSX.Element => {
  return (
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
        path="/" // todo fix
        description="(All your data including order history will be deleted)"
      />
    </>
  );
};
