import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/work/:path*",
    "/createWork/:path*",
    "/selectWork/:path*",
  ]
};
