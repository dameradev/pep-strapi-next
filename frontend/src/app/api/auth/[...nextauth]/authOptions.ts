import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export type StrapiUserT = {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  provider: "local" | "google";
};

export type StrapiLoginResponseT = {
  jwt: string;
  user: StrapiUserT;
};
export type StrapiErrorT = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
};
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log('singIn callback', { account, profile, user });
      if (
        account &&
        account.provider === 'google' &&
        profile &&
        'email_verified' in profile
      ) {
        if (!profile.email_verified) return false;
      }
      return true;
    },

    async jwt({ token, trigger, account, user, session }) {
      // console.log('jwt callback', {
      //   token,
      //   trigger,
      //   account,
      //   user,
      //   session,
      // });

      if (account) {
        if (account.provider === 'google') {
          // we now know we are doing a sign in using GoogleProvider
          try {
            const strapiResponse = await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
              { cache: 'no-cache' }
            );
            if (!strapiResponse.ok) {
              const strapiError: StrapiErrorT = await strapiResponse.json();
              // console.log('strapiError', strapiError);
              throw new Error(strapiError.error.message);
            }
            const strapiLoginResponse: StrapiLoginResponseT =
              await strapiResponse.json();
            // customize token
            // name and email will already be on here
            token.strapiToken = strapiLoginResponse.jwt;
            token.strapiUserId = strapiLoginResponse.user.id;
            token.provider = account.provider;
            token.blocked = strapiLoginResponse.user.blocked;
          } catch (error) {
            throw error;
          }
        }
      }

      return token;
    },
    async session({ token, session }) {
      // console.log('session callback', {
      //   token,
      //   session,
      // });

      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-up',
    error: '/authError',
  },
};