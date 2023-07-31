// store our configuration for authentication

import { NextAuthOptions, DefaultSession, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";
import GoogleProvider from "next-auth/providers/google";

// we have to tell nextauth what our user looks like
// extending the nextauth type definitions
declare module "next-auth" {
  interface Session extends DefaultSession {
    // extending the user by adding an id to it
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// give the jwt token we have from nextauth and id
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // facilitate our tokens and sessions
  callbacks: {
    jwt: async ({ token }) => {
      // finding the user
      const db_user = await prisma.user.findFirst({
        where: {
          email: token?.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      // after we get all the info from the user session into our token we can return our session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

// utlitiy function to get our session
export const getAuthSession = () => {
  return getServerSession(authOptions)
};
