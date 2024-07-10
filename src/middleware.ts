import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/lib"; // Pastikan path ini sesuai dengan lokasi fungsi decrypt

export async function middleware(request: NextRequest) {
  console.log("Middleware running!");
  const token = request.cookies.get("token")?.value;

  // Jika URL adalah home ("/"), biarkan akses tanpa login
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (token) {
    const user = await decrypt(token);

    if (user && !request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.\\.).*)"],
};
