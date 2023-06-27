import { HOME, LOGIN, PERSONAL_ACCOUNT, REGISTER } from '../../routes';

export const HEADER_MENU_CONTENT = {
  UNAUTHORIZED: [
    {
      label: 'Log in',
      href: LOGIN,
    },
    {
      label: 'Register',
      href: REGISTER,
    },
  ],
  SELLER: [
    {
      label: 'My profile',
      href: PERSONAL_ACCOUNT,
    },
    {
      label: 'Edit profile',
      href: PERSONAL_ACCOUNT,
    },
    {
      label: 'Settings',
      href: PERSONAL_ACCOUNT,
    },
    {
      label: 'My orders',
      href: PERSONAL_ACCOUNT,
    },
    {
      label: 'Log out',
      href: '/logout',
    },
  ],
  SUPPLIER: [
    {
      label: 'Name 1',
      href: HOME,
    },
    {
      label: 'Name 2',
      href: HOME,
    },
    {
      label: 'Log out',
      href: '/logout',
    },
  ],
} as const;
