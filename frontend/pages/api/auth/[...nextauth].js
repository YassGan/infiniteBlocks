import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import * as jsonwebtoken from "jsonwebtoken";
import { isAddress } from 'ethers/lib/utils';

export const jwtOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  maxAge: parseInt(process.env.TOKEN_LIFE_TIME) || 30 * 24 * 60 * 60, // 30 days
  encode: async ({ secret, token: payload }) =>
    jsonwebtoken.sign(payload, secret, {
      algorithm: "RS256",
    }),
  decode: async ({ secret, token }) => {
    const decodedToken = jsonwebtoken.verify(token, secret, {
      algorithms: ["RS256"],
    });
    return decodedToken;
  },
};

const refreshAccessToken = async (token) => {
  try {
    // how to refresh the access token ?
    return token;
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);

          let csrf = await getCsrfToken({ req })
          console.log(csrf);
          
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: csrf,
          });
          console.log(result);
          console.log({ result, siwe });

          if (result.success) {
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    session: {
      strategy: "jwt",
    },
    jwt: jwtOptions,
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        session.user = token.user;
        session.error = token.error;
        if (isAddress(token.sub)) {
          session.address = token.sub;
          session.user.name = token.sub;
        }
        return session;
      },
      async jwt(args) {
        const {
          token,
          user,
          account,
          profile,
          isNewUser,
        } = args;
        // First time user sign in
        if (user && account) {
          return {
            accessToken: account.access_token,
            accessTokenExpires:
              Date.now() + (account?.expires_at) * 1000,
            refreshToken: account.refresh_token,
            user: { ...user, name: profile?.name },
            provider: account.provider,
            providerType: account.type,
            role: "user",
          };
        } else {
          Object.assign(token, {
            role: token.user ? "user" : "anonymous",
          });
        }
        // Return previous token if the access token has not expired yet
        if (Date.now() < (token.accessTokenExpires)) {
          return token;
        }
        // Access token has expired, try to update it
        return refreshAccessToken(token);
      },
    },
  });
}