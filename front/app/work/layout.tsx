
import Header from "@/app/components/base/Header";

import FixedButton from "@/app/components/ui/FixedButton"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <FixedButton />
    </>
  );
};

export default Layout;
