import React from 'react';

import { AccountManagementLink } from './AccountManagmentLink/AccountManagmentLink';

import { CHANGE_EMAIL, CHANGE_PASSWORD, HOME } from 'routes';

export const AccountManagement = (): JSX.Element => {
  return (
    <>
      <AccountManagementLink
        linkLabel="Change your email"
        path={CHANGE_EMAIL}
        description="(You will have to confirm a new email)"
      />
      <AccountManagementLink
        linkLabel="Change your password"
        path={CHANGE_PASSWORD}
        description="(In case if you forgot a current password or need a stronger one)"
      />
      <AccountManagementLink
        linkLabel="Remove the account"
        path={HOME} // todo fix
        description="(All your data including order history will be deleted)"
      />
    </>
  );
};
