import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnSignUp = nextUrl.pathname.startsWith('/signup');

      if (isLoggedIn) {
        if (isOnLogin) {
          return false
        }
        if (isOnSignUp) {
          return false
        }
      } else {
        if (isOnDashboard) {
          return false
        }
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;