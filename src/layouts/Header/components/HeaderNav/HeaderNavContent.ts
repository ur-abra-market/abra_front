import {
  ABOUT,
  ANALYTICS,
  CONTACT,
  DASHBOARD,
  PRODUCTS,
  FAQ,
  FEEDBACK,
  NEWS,
  ORDERS,
  PRICE,
  SELL,
  TUTORIALS,
  PROFILE,
} from 'routes';

export const HEADER_NAV_CONTENT = {
  seller: [
    { id: 1, label: 'Last News', path: NEWS },
    { id: 2, label: 'Tutorials for Buyers', path: TUTORIALS },
    { id: 3, label: 'Sell on Abra', path: SELL },
    { id: 4, label: 'Contact Support', path: CONTACT },
    { id: 5, label: 'FAQ', path: FAQ },
    { id: 6, label: 'About Us', path: ABOUT },
  ],
  supplier: [
    { id: 1, label: 'Profile', path: PROFILE },
    { id: 1, label: 'Dashboard', path: DASHBOARD },
    { id: 2, label: 'Products List', path: PRODUCTS },
    { id: 3, label: 'Orders', path: ORDERS },
    { id: 4, label: 'Price Management', path: PRICE },
    { id: 5, label: 'Analytics', path: ANALYTICS },
    { id: 6, label: 'Feedback and questions', path: FEEDBACK },
  ],
};
