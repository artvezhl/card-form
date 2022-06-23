import Head from "next/head";
import Form from "../src/components/Form";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
        <Head>
            <title>Card Form App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <h1>Card Form</h1>
            <Form />
        </main>
    </div>
  );
}

