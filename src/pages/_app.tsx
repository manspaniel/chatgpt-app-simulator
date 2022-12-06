import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <script async src="https://cdn.tailwindcss.com"></script>
      <Component {...pageProps} />
    </>
  );
}
