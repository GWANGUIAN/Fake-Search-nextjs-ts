import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
