import type { NextAuthConfig } from "next-auth";

const authConfig = {
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },

    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      const pathname = request.nextUrl.pathname;

      const isDashboard =
        pathname.startsWith("/dashboard");

      const isLogin =
        pathname === "/login";

      const isSignup =
        pathname === "/signup";

      if (!isLoggedIn && isDashboard) {
        return false;
      }

      if (isLoggedIn && (isLogin || isSignup)) {
        return Response.redirect(
          new URL("/dashboard", request.url)
        );
      }

      return true;
    },
  },

  providers: [],

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;