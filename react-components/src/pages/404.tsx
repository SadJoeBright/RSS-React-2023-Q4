import Head from 'next/head';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>RSS-React-2023-Q4 | 404</title>
      </Head>
      <p data-testid="not-found-page">Such page does not exist</p>
    </>
  );
}
