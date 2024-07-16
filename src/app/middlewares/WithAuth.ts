import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdminPage = ["/dashboard"];
const authPage = ["/login", "/register"];

export default function WithAuth
  (middleware: NextMiddleware,
    requireAuth: string[] = []
  ) {
  return async (req: NextRequest, res: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
      });

      if (!token && !authPage.includes(pathname)) {
        const url = new URL(`/login`, req.url);
        url.searchParams.set('callbackURL', encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
        if (token.role !== 'admin' && onlyAdminPage.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url))
        }
      }

    }

    return middleware(req, res);
  }
};
