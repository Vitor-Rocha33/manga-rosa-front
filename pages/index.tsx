import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Manga Rosa
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Vitor-Rocha33"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}Vitor
        </a>
      </footer>
    </div>
  )
}

export default Home
