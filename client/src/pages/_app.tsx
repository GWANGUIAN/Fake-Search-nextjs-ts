import '../styles/globals.css';

import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';

import { wrapper } from '../redux/store';
import { globalStyles } from '../styles/reset';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
);

export default wrapper.withRedux(MyApp);
