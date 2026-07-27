import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getPartnerByGoogleId } from "./db/partners";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        const googleId = account.providerAccountId;
        token.googleId = googleId;
        
        const existingPartner = await getPartnerByGoogleId(googleId);
        if (existingPartner) {
          token.partnerId = existingPartner.id;
          token.isAdmin = existingPartner.isAdmin || false;
          token.status = existingPartner.status;
        } else {
          token.isNewUser = true;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session as any).googleId = token.googleId;
        (session as any).partnerId = token.partnerId;
        (session as any).isAdmin = token.isAdmin;
        (session as any).status = token.status;
        (session as any).isNewUser = token.isNewUser;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
};
