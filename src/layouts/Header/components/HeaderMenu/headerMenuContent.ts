import { HOME, PERSONAL_ACCOUNT } from 'routes';

export const HEADER_MENU_CONTENT = {
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
  ],
} as const;
