import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { ProfileMenu } from '../Top';

export interface BuildProfileMenuProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isAuth: boolean;
  PROFILE_MENU: ProfileMenu;
  handleClickLogout: () => void;
}
