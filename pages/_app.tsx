import { Layout } from '@/layouts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
};
export default App;
