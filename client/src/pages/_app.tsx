import '../styles/globals.css';

import { Global } from '@emotion/react';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Head from '../items/Head';
import { login } from '../redux/actions';
import { wrapper } from '../redux/store';
import { globalStyles } from '../styles/reset';
import type { LoginState } from '../types/state';
import { logger } from '../utils/logger';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch();

  const isAuthenticated = useCallback(() => {
    axios
      .get<LoginState>(`${process.env.NEXT_PUBLIC_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          dispatch(login(res.data));
        }
      })
      .catch((error) => {
        dispatch(login({ isLogin: false, siteName: 'FAKESEARCH' }));
        logger.error(error);
      });
  }, [dispatch]);

  useEffect(() => {
    void isAuthenticated();
  }, [isAuthenticated]);

  const updateTitle = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_API}/users/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        const htmlTitle = document.querySelector('title');

        if (htmlTitle) {
          htmlTitle.innerHTML = res.data.siteName;
        }
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  useEffect(() => {
    updateTitle();
  }, []);

  return (
    <>
      <Head />
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
