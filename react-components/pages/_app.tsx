/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from '../src/components/RootLayout/RootLayout';
import { AppProvider } from '../src/components/context/appContext';
import { store } from '../src/state/store';
// import './global.module.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AppProvider>
  );
}
