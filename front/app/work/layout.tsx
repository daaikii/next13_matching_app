import Header from "@/app/components/base/Header";
import Link from "next/link";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Link href="/createWork">
        <div>作成する</div>
      </Link>
    </>
  );
};

export default Layout;
