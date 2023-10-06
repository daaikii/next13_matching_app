"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Button from "@/app/components/ui/Button";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header>
      <h1>
        <Link href={session ? "/" : "/home"}>BAITO-MATCH</Link>
      </h1>
      <nav>
        <ul>
          {
            /*条件分岐 ログイン時、ページごと*/
            session && (
              <>
                <Link href="/work/listType/follow">気になるバイト</Link>
                <Link href="/work/listType/entry">エントリー済みバイト</Link>
                <Link href="/work/listType/author">募集中バイト</Link>
                <Button onClick={signOut}>SIGN OUT</Button>
              </>
            )
          }
        </ul>
      </nav>
    </header>
  );
};
export default Header;
