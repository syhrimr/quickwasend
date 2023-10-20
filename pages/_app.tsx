import type { AppProps } from "next/app";
import Head from "next/head";
import Footer from "../components/Footer";

import "../styles/globals.css";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Quick Whatsapp Send</title>
        <meta
          name="description"
          content="Start to chat with Whatsapp quickly and save your contact for storing unnecessary number."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center min-h-screen bg-green-50 overflow-hidden">
        <main className="flex flex-1 items-center p-8">
          <div className={styles.container}>
            <Component {...pageProps} />
          </div>
        </main>

        <Footer></Footer>
      </div>
    </>
  );
}

export default MyApp;
