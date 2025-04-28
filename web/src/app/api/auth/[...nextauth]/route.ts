import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { store } from '@/app/libs/store';
import { authApi, AuthResponse } from '@/app/services/authApi';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

const { login } = authApi.endpoints;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const result = await store.dispatch(
          login.initiate({
            email: credentials.email,
            password: credentials.password,
          })
        );

        const { data, error } = result as {
          data?: AuthResponse;
          error?: FetchBaseQueryError | SerializedError;
        };
        if (error || !data) return null;

        const { user, token } = data;
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          accessToken: token,
        };
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user && 'accessToken' in user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user!,
        // @ts-expect-error
        id: token.sub as string,
        username: token.username as string,
      };
      // @ts-expect-error
      session.accessToken = token.accessToken as string;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
