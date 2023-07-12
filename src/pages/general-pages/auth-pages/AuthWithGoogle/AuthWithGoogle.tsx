import { FC, useState } from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import style from './AuthWithGoogle.module.scss';

import googleIcon from 'assets/icons/files/google-auth.svg';

export const AuthWithGoogle: FC = () => {
  const [authCode, setAuthCode] = useState('');

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const data = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      console.log(data);

      console.log(tokenResponse.access_token);
    },
  });

  return (
    <div className={style.wrapper}>
      <button type="submit" className={style.btn} onClick={() => login()}>
        <img src={googleIcon} alt="google icon" />
      </button>
    </div>
  );
};
