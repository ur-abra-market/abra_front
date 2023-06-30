import {
  ABOUT,
  ANALYTICS,
  CONTACT,
  DASHBOARD,
  FAQ,
  FEEDBACK,
  NEWS,
  ORDERS,
  PRICE,
  SELL,
  TUTORIALS,
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
    { id: 1, label: 'Dashboard', path: DASHBOARD },
    { id: 2, label: 'Orders', path: ORDERS },
    { id: 3, label: 'Price Management', path: PRICE },
    { id: 4, label: 'Analytics', path: ANALYTICS },
    { id: 5, label: 'Feedback and questions', path: FEEDBACK },
  ],
};
