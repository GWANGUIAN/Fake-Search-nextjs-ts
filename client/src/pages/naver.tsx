import axios from 'axios';
import Router from 'next/router';
import { useEffect } from 'react';

import Loading from '../components/Loading/Loading';
import { logger } from '../utils/logger';

export default function NaverLogin() {
  const getNaverToken = async () => {
    const hash = Router.asPath.split('#')[1];
    const token = hash.split('=')[1].split('&')[0];

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/users/naver-login`,
        {
          token,
        },
        {
          withCredentials: true,
        },
      );
      window.location.replace('/');
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    void getNaverToken();
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
}
