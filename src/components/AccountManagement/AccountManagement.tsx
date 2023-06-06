import React, { FC } from 'react';

import { AccountManagementLink } from '../AccountManagmentLink/AccountManagmentLink';

const AccountManagement: FC = () => {
  return (
    <>
      <AccountManagementLink
        linkLabel="Change your email"
        path="/changeEmail"
        description="(You will have to confirm a new email)"
      />
      <AccountManagementLink
        linkLabel=" Change your password"
        path="/changePassword"
        description="(In case if you forgot a current password or need a stronger one)"
      />
      <AccountManagementLink
        linkLabel=" Remove the account?"
        path="/" // todo fix
        description="(All your data including order history will be deleted)"
      />
    </>
  );
};

export default AccountManagement;
