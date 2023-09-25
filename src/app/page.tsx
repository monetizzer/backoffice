'use client';

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <button onClick={() => {
        window.location.replace(process.env['NEXT_PUBLIC_DISCORD_REDIRECT_URL']!)
      }}>Discord</button>
    </main>
  )
}
