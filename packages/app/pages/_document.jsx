import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Nocred.</title>
        <meta
          name="description"
          content="Secure E-Portal Access Without Credentials"
        />
        <meta
          property="og:title"
          content="Securely Grant other students access to your noun elearn portal without sharing credentials."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nocred.vercel.app" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/7.png"
        />
        <meta
          property="og:description"
          content="Securely Grant other students access to your noun elearn portal without sharing credentials."
        />
        <meta property="og:site_name" content="nocred" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nocred" />
        <meta
          name="twitter:title"
          content="Secure E-Portal Access Without Credentials"
        />
        <meta
          name="twitter:description"
          content="Securely Grant other students access to your noun elearn portal without sharing credentials."
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/7.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
