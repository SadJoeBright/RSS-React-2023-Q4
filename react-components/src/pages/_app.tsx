import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { wrapper } from '../state/store';
import Layout from '../components/RootLayout/RootLayout';
import ErrorBoundary from '../components/errorBoundary/errorBounadary';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </ErrorBoundary>
  );
}
