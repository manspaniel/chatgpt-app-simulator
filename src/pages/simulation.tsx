import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";

const Simulation = dynamic(() => import("../components/screens/Simulation"), {
  ssr: false,
});

export default function SimulationPage() {
  return (
    <>
      <Head>
        <title>ChatGPT App Simulator</title>
      </Head>
      <Simulation />
    </>
  );
}
