import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./utils/decodeToken"; // Ensure this utility function is defined
import { TUser } from "./redux/features/auth/authSlice"; // Adjust import according to your structure
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const token = cookies().get("token")?.value;
  const { pathname } = request.nextUrl;

  // Redirect to login if trying to access /join without a token
  if (!token && pathname === "/join") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect to home if trying to access /login or /register with a token
  if (token && (pathname === "/login" || pathname === "/register")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Role-based access control for /dashboard and its sub-routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      const decoded = decodeToken(token) as TUser;
      const role = decoded.role;

      // Allow access based on roles for specific dashboard routes
      if (role === "TEACHER" && pathname.startsWith("/dashboard")) {
        return NextResponse.next(); // Allow access to the main dashboard for teachers
      } else {
        const url = request.nextUrl.clone();
        url.pathname = "/"; // Redirect to home for unauthorized access
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.log(error);
      const url = request.nextUrl.clone();
      url.pathname = "/login"; // Redirect to login if token is invalid
      return NextResponse.redirect(url);
    }
  }

  // Allow request if it doesn’t match the conditions
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/join", "/login", "/register", "/dashboard/:path*"],
};
