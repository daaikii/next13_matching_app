import Header from "@/app/components/base/Header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
