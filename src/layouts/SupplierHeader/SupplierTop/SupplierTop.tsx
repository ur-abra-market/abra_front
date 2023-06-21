import React, { useState } from 'react';

import cn from 'classnames';
import { Link } from 'react-router-dom';

import { useOnClickOutside } from '../../../common/hooks';

import { ArrowIcon, HeaderNotificationsIcon, LogoCompanyPlaceholder } from 'assets/icons';
import { HeaderMenu } from 'components/HeaderMenu/HeaderMenu'; // 5 10px for ArrowRightIcon
import style from 'layouts/SupplierHeader/SupplierTop/SupplierTop.module.scss';
import { MainLogo } from 'ui-kit';

const SupplierTop = (): JSX.Element => {
  const [active, setActive] = useState(false);
  const triggerRef = useOnClickOutside(setActive);

  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <MainLogo className={style.logo_font_size} />
        <span className={style.vertical_line} />
        <span>
          <Link className={style.supplier_link} to="/">
            SUPPLIER
          </Link>
        </span>
      </div>
      <div className={style.inner_buttons}>
        <Link to="/">
          <HeaderNotificationsIcon />
        </Link>
        <div role="presentation" className={style.btn_menu} ref={triggerRef}>
          <LogoCompanyPlaceholder />
          <button
            className={style.menu_icons}
            onClick={() => setActive(!active)}
            type="button"
          >
            <span className={style.business_name}>Business Name</span>

            <ArrowIcon className={cn({ [style.arrow]: active })} />
          </button>
          <HeaderMenu active={active} setActive={() => setActive(false)} />
        </div>
      </div>
    </div>
  );
};

export default SupplierTop;
