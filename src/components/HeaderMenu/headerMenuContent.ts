export const HEADER_MENU_CONTENT = {
  UNAUTHORIZED: [
    {
      label: 'Log in',
      href: '/login',
    },
    {
      label: 'Register',
      href: '/register',
    },
  ],
  SELLER: [
    {
      label: 'My profile',
      href: '/personal_account',
    },
    {
      label: 'Edit profile',
      href: '/personal_account',
    },
    {
      label: 'Settings',
      href: '/personal_account',
    },
    {
      label: 'My orders',
      href: '/personal_account',
    },
    {
      label: 'Log out',
      href: '/logout',
    },
  ],
  SUPPLIER: [
    {
      label: 'Name 1',
      href: '/',
    },
    {
      label: 'Name 2',
      href: '/',
    },
    {
      label: 'Log out',
      href: '/logout',
    },
  ],
} as const;
