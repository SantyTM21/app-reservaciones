import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  session: {
    generateSessionToken: () => {
      return 'newToken';
    },
    maxAge: 30 * 60, //Tiempo: 30 minutes
    strategy: 'jwt',
    updateAge: 10 * 60,
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/pages');
      const isImageRequest = nextUrl.pathname.match(/\.(png|jpg|jpeg)$/);

      if (isImageRequest) {
        return true; // Permitir acceso a imágenes
      }
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/pages', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
