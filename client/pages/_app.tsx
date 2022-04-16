import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react";
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux'; 
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
