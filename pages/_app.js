// import '../styles/globals.css'
// import type { AppProps } from 'next/app'
{/* </Layout> */}
import Layout from '../components/Layout';
import React from 'react';
import '../styles/globals.scss'
function MyApp({ Component, pageProps }) {
  return (
    // <Layout>
      <Component {...pageProps} />
  )
}

export default MyApp;  