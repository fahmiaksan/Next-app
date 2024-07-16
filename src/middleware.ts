import withAuth from "./app/middlewares/WithAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, ["/dashboard", "/profile", "/login", "/register"]);

