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
  // Use default cookies on Vercel
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const googleId = account.providerAccountId;
        const email = user.email;
        token.googleId = googleId;
        
        // Super Admin Override
        if (email === 'hasanfistikci01@gmail.com' || email === 'erengun00@gmail.com') {
          token.isAdmin = true;
          token.isNewUser = false;
          token.partnerId = 'admin-override';
          token.status = 'active';
          return token;
        }
        
        try {
          const existingPartner = await getPartnerByGoogleId(googleId);
          if (existingPartner) {
            token.partnerId = existingPartner.id;
            token.isAdmin = existingPartner.isAdmin || false;
            token.status = existingPartner.status;
          } else {
            token.isNewUser = true;
          }
        } catch (error) {
          console.error("Firestore error during login:", error);
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
