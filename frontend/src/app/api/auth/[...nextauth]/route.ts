import NextAuth from 'next-auth';
import { authOptions } from './authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// // imports
// import NextAuth from "next-auth";

// // importing providers
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";


// const handler = NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],

//   async jwt({
//     token,
//     trigger,
//     account,
//     user,
//     session,
//   }: {
//     token: any;
//     trigger: any;
//     account: any;
//     user: any;
//     session: any;
//   }) {
//     console.log(
//       token,
//       "token",
//       trigger,
//       "trigger",
//       account,
//       "account",
//       user,
//       "user",
//       session,
//       "session"
//     );
//     if (account) {
//       if (account.provider === "google") {
//         // we now know we are doing a sign in using GoogleProvider
//         try {
//           const strapiResponse = await fetch(
//             `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
//             { cache: "no-cache" }
//           );

//           console.log(strapiResponse, "strapiResponse");
//           if (!strapiResponse.ok) {
//             const strapiError: StrapiErrorT = await strapiResponse.json();
//             throw new Error(strapiError.error.message);
//           }
//           const strapiLoginResponse: StrapiLoginResponseT =
//             await strapiResponse.json();
//           // customize token
//           // name and email will already be on here
//           token.strapiToken = strapiLoginResponse.jwt;
//         } catch (error) {
//           throw error;
//         }
//       }
//     }

//     return token;
//   },
// });

// export { handler as GET, handler as POST };
