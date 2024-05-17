import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

import cn from 'classnames';

import { CrossRedIcon } from 'assets/icons';
import { useSearchHandler } from 'common/hooks';
import { ButtonIcon } from 'ui-kit/buttons/ButtonIcon/ButtonIcon';

import styles from './Search.module.scss';

export interface ISearch
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > {
  isPhotoSearch?: boolean;
  mainSearchField?: boolean;
}

export const Search = forwardRef<HTMLInputElement, ISearch>((props, ref): JSX.Element => {
  const {
    className,
    isPhotoSearch = false,
    mainSearchField = false,
    ...restProps
  } = props;

  const { value, handleChangeValue, handleRemoveValue, handleKeyDown } =
    useSearchHandler(mainSearchField);

  return (
    <div className={cn(styles.wrapper, className)}>
      <input
        className={cn(styles.input, className)}
        ref={ref}
        value={value}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDown}
        type="text"
        {...restProps}
      />

      {isPhotoSearch && (
        <label className={styles.button}>
          <input className={styles.photo_search} type="file" />
        </label>
      )}

      {!!value.length && (
        <ButtonIcon
          className={`${styles.button_cross} ${isPhotoSearch ? styles.add_margin : ''}`}
          onClick={handleRemoveValue}
        >
          <CrossRedIcon className={styles.cross_icon} />
        </ButtonIcon>
      )}
    </div>
  );
});
