/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Layout from '../src/components/RootLayout/RootLayout';
import { AppProvider } from '../src/components/context/appContext';
import { store, wrapper } from '../src/state/store';
// import './global.module.css';

export function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      {/* <Provider store={store}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </Provider> */}
    </AppProvider>
  );
}

export default wrapper.withRedux(App);
