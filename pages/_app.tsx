import type { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from "../components/Footer"

import '../styles/globals.css'
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fast Whataspp Send</title>
        <meta name="description" content="Start to chat with using Whatsapp by not register a new contact to your phone." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen bg-slate-50">
        <main className="flex-1 p-8">
          <div className={styles.container}>
            <Component {...pageProps} />
          </div>
        </main>
        
        <Footer></Footer>
      </div>
    </>
  )
}

export default MyApp
