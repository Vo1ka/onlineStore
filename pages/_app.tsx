import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../src/redux/store'
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
    <Provider store={store}>
    <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
  <Component {...pageProps} />
  </Provider>
  </ApolloProvider>
  )
}

export default MyApp
