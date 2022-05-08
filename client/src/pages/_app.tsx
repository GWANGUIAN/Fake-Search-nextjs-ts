import '../styles/globals.css';

import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';

import Head from '../items/Head';
import { wrapper } from '../redux/store';
import { globalStyles } from '../styles/reset';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head />
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(MyApp);
