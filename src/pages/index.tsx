import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";

const IntroScreen = dynamic(() => import("../components/screens/IntroScreen"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>ChatGPT App Simulator</title>
      </Head>
      <IntroScreen />
    </>
  );
}
