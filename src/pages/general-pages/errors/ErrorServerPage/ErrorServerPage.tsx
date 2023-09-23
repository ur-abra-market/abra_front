import { useNavigate } from 'react-router-dom';

import styles from './ErrorServerPage.module.scss';

import { ReactComponent as HomeIcon } from 'assets/icons/files/home.svg';
import { Footer } from 'layouts';
import { HOME } from 'routes';
import { Button, ButtonIcon, MainLogo, Title } from 'ui-kit';

export const ErrorServerPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <section className={styles.wrapper}>
      <div className={styles.header_wrapper}>
        <div className={styles.header}>
          <MainLogo />

          <ButtonIcon onClick={() => navigate(HOME)}>
            <HomeIcon className={styles.icon_home} />
          </ButtonIcon>
        </div>
      </div>

      <div className={styles.error_page}>
        <Title size="s">Server Error</Title>
        <Button className={styles.button} label="Retry" onClick={() => navigate(-1)} />
      </div>

      <div className={styles.footer}>
        <Footer variant="default" />
      </div>
    </section>
  );
};
