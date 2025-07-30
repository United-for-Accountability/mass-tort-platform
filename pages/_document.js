import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon_16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon_32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/images/favicon/favicon_48x48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon/favicon_64x64.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/images/favicon/favicon_128x128.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/images/favicon/favicon_256x256.png" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
