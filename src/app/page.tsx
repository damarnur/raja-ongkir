import Head from "next/head";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Raja Ongkir</title>
        <meta
          name="description"
          content="Halaman awal web saya menggunakan Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.navbar}>
        <div>
          <a href="/">Home</a>
        </div>
        <div>
          <a href="/login">Login</a>
        </div>
      </nav>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Selamat Datang di Raja<a>Ongkir</a>
        </h1>

        <p className={styles.description}>
          Periksa ongkos kirim dan lacak paket dengan cepat disini
        </p>
      </main>
    </div>
  );
}
