import React, { FC, useState } from 'react';

import cn from 'classnames';

import { ILocationAndCurrencySelection } from './LocationAndCurrencySelection.props';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { useOnClickOutside } from 'common/hooks/useOnClickOutside';
import { CountriesEnum } from 'common/types';
import { COUNTRY_FLAGS } from 'common/utils';
import { getCountries } from 'store/reducers/commonSlice';
import { ISelectOption, Select } from 'ui-kit';

import style from './LocationAndCurrencySelection.module.scss';

const CURRENCY_DATA: ISelectOption[] = [
  { label: { text: 'Russian / RUB' }, value: 'ru' },
  { label: { text: 'English / USD' }, value: 'usd' },
];

const COUNTRY_DATA: ISelectOption[] = [
  {
    label: { text: 'Russia', image_src: COUNTRY_FLAGS[CountriesEnum.RUSSIAN] },
    value: CountriesEnum.RUSSIAN,
  },
  {
    label: { text: 'Turkey', image_src: COUNTRY_FLAGS[CountriesEnum.TURKEY] },
    value: CountriesEnum.TURKEY,
  },
  {
    label: { text: 'Belarus', image_src: COUNTRY_FLAGS[CountriesEnum.BELARUS] },
    value: CountriesEnum.BELARUS,
  },
];

export const LocationAndCurrencySelection: FC<ILocationAndCurrencySelection> = ({
  className,
  dropOnUp = false,
  isMobileView,
  wrapperClassName,
}) => {
  const dispatch = useAppDispatch();

  const [isOpenOnMobile, setOpenOnMobile] = useState(false);

  const containerClasses = cn(style.container, className, {
    [style.mobile]: isMobileView,
    [style.show]: isMobileView && isOpenOnMobile,
  });

  const handleToggleOpenOnMobile = (): void => {
    setOpenOnMobile(prev => !prev);
  };

  const refObj = useOnClickOutside(setOpenOnMobile);

  const handleSelect = (value: ISelectOption): void => {
    dispatch(getCountries());
    localStorage.setItem('selectedLabel', JSON.stringify(value));
  };

  return (
    <div ref={refObj} className={cn(style.wrapper, wrapperClassName)}>
      {isMobileView && (
        <div onClickCapture={handleToggleOpenOnMobile} className={style.mobile_header}>
          <div className={style.currency}>
            {CURRENCY_DATA[0].label.text.substring(
              CURRENCY_DATA[0].label.text.length - 3,
            )}
          </div>

          <div>
            <img width="20px" src={COUNTRY_DATA[0].label.image_src} alt="flag" />
          </div>

          <ArrowIcon className={cn({ [style.arrow_up]: isOpenOnMobile })} width="14" />
        </div>
      )}

      <div className={containerClasses}>
        <Select
          dropOnUp={dropOnUp}
          options={CURRENCY_DATA}
          width="172px"
          header
          className={style.select}
        />

        <div className={style.select_box}>
          <span className={style.select_title}>Ship to</span>
          <Select
            onChange={handleSelect}
            dropOnUp={dropOnUp}
            options={COUNTRY_DATA}
            header
            width="150px"
            className={style.select}
            isCountrySelect
          />
        </div>
      </div>
    </div>
  );
};
