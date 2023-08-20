import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fast Whataspp Send</title>
        <meta name="description" content="Start to chat with using Whatsapp by not register a new contact to your phone." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div>
        <main>
          <div className={styles.container}>
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    </>
  )
}

export default MyApp
