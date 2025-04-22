import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (token && (path.startsWith("/login") || path.startsWith("/register"))) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        if (path.startsWith("/admin")) {
          return token?.role === "admin"
        }

        if (path.startsWith("/profile") || path.startsWith("/dashboard")) {
          return !!token
        }

        if (path.startsWith("/login") || path.startsWith("/register")) {
          return true
        }

        return false
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/login/:path*", "/register/:path*", "/dashboard/:path*"],
}
