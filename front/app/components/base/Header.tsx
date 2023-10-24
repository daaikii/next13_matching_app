"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import styles from "./Header.module.scss";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <h1 className={styles.header_title}>
          <Link href={session ? "/" : "/work"}>BAITO-MATCH</Link>
        </h1>
        {session && (
          <>
            <div
              onClick={() => setIsOpen((e) => !e)}
              className={`${isOpen && styles.open} ${styles.header_dropdown}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <nav onClick={(e) => e.target === e.currentTarget && setIsOpen(false)} className={`${isOpen && styles.open} ${styles.header_nav}`}>
              <ul>
                <Link
                  className={`${isOpen && styles.open} ${styles.header_nav_item}`}
                  href="/work/listType/follow"
                >
                  気になるバイト
                </Link>
                <Link
                  className={`${isOpen && styles.open} ${styles.header_nav_item}`}
                  href="/work/listType/entry"
                >
                  エントリー済みバイト
                </Link>
                <Link
                  className={`${isOpen && styles.open} ${styles.header_nav_item}`}
                  href="/work/listType/author"
                >
                  募集中バイト
                </Link>
                <Link
                  href=""
                  className={`${isOpen && styles.open} ${styles.header_nav_item}`}
                  onClick={() => signOut()}
                >
                  SIGN OUT
                </Link>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
