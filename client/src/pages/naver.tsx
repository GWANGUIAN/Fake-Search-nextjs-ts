import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import Loading from '../components/Loading/Loading';
import { logger } from '../utils/logger';

export default function NaverLogin() {
  const location = useRouter();

  const getNaverToken = useCallback(async () => {
    if (!location.query.hash) {
      return;
    }

    const hash = location.query.hash as string;
    const token = hash.split('=')[1].split('&')[0];

    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API}/users/naver-login`,
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
  }, [location]);

  useEffect(() => {
    void getNaverToken();
  }, [getNaverToken]);

  return (
    <div className="naverlogin-container">
      <Loading />
    </div>
  );
}
