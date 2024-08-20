// import type { NextAuthConfig } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { getSession } from 'next-auth/react';
 
// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async authorized({ auth, request: { nextUrl } }) {
//       console.log('authorized', auth, nextUrl);
//       const isLoggedIn = !!auth?.user;
//       const isOnHome = nextUrl.pathname.startsWith('/home');
//       if (isOnHome) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         const userId = auth.user?.id;
//         return Response.redirect(new URL(`/home/`, nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [Credentials({})],
// } satisfies NextAuthConfig;