import style from './Material.module.scss';

export const Material = (): JSX.Element => {
  return (
    <div className={style.material}>
      <p className={style.title}>Material</p>
    </div>
  );
};
