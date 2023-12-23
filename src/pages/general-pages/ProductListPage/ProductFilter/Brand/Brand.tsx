import style from './Brand.module.scss';

export const Brand = (): JSX.Element => {
  return (
    <div className={style.brand}>
      <p className={style.title}>Brand</p>
    </div>
  );
};
