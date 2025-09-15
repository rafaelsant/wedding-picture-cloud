import Head from 'next/head';
import AuthComponent from '../components/AuthComponent';

export default function Home() {
  return (
    <>
      <Head>
        <title>Wedding Picture Cloud</title>
        <meta name="description" content="Share your beautiful wedding memories with loved ones" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthComponent />
    </>
  );
}