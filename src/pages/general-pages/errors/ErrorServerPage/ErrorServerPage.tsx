import { useNavigate } from 'react-router-dom';

import { ReactComponent as HomeIcon } from 'assets/icons/files/home.svg';
import { Footer } from 'layouts';
import { HOME } from 'routes';
import { Button, ButtonIcon, MainLogo, Title } from 'ui-kit';

import styles from './ErrorServerPage.module.scss';

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

      <Footer variant="black" className={styles.footer} />
    </section>
  );
};
