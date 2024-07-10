"use client";

import { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import styles from "./Dashboard.module.css";
import { logout } from "@/lib/lib"; // Pastikan path sesuai dengan lokasi file auth.js

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setIsLoggedIn(false);
      window.location.href = "/login";
    } else {
      console.error("Logout failed:", result.message);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Halaman dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Dashboard</h1>
        {isLoggedIn ? (
          <Button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </Button>
        ) : (
          <p>
            Anda telah logout. Silakan <a href="/login">login</a> kembali.
          </p>
        )}
      </main>
    </div>
  );
}
