export const MENU = {
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
      label: 'My Profile',
      href: '/personal_account',
    },
    {
      label: 'Edit Profile',
      href: '/personal_account',
    },
    {
      label: 'Settings',
      href: '/personal_account',
    },
    {
      label: 'My Orders',
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
      label: 'Log Out',
      href: '/logout',
    },
  ],
} as const;
