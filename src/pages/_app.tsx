import type { AppProps } from "next/app";
import Script from "next/script";

const GTAG_ID = "G-8RJ794XS36";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
      />
      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GTAG_ID}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <script async src="https://cdn.tailwindcss.com"></script>
      <Component {...pageProps} />
    </>
  );
}
