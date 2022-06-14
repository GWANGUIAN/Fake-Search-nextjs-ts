import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loading from '../components/Loading/Loading';
import { logger } from '../utils/logger';

const NaverLogin = () => {
  const router = useRouter();

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
      void router.replace('/');
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
};

export default NaverLogin;
