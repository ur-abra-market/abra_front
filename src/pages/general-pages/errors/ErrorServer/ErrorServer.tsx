import { useNavigate } from 'react-router-dom';

import styles from './ErrorServer.module.scss';

import { ReactComponent as HomeIcon } from 'assets/icons/files/home.svg';
import { Footer } from 'layouts';
import { HOME } from 'routes';
import { Button, ButtonIcon, ButtonInfo, MainLogo } from 'ui-kit';

export const ErrorServer = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <MainLogo className={styles.logo} />

        <ButtonIcon onClick={() => navigate(HOME)}>
          <HomeIcon className={styles.icon_home} />
        </ButtonIcon>
      </div>

      <div id="error-server" className={styles.error_page}>
        <h3>Server Error</h3>
        <Button className={styles.button} label="Retry" onClick={() => navigate(-1)} />
      </div>

      <ButtonInfo className={styles.button_info} />

      <div className={styles.footer}>
        <Footer variant="default" />
      </div>
    </div>
  );
};
