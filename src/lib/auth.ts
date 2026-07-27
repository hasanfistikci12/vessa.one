import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";

const isMockMode = process.env.GOOGLE_CLIENT_ID === 'your_google_client_id';

const MOCK_SESSION = {
  user: {
    name: "Mock User",
    email: "test@vessa.one",
    image: "https://lh3.googleusercontent.com/a/mock-image"
  },
  partnerId: "mock-partner-1",
  isAdmin: true,
  isNewUser: false
};

export async function getSession() {
  if (isMockMode) return MOCK_SESSION;
  return await getServerSession(authOptions);
}

export async function requirePartnerAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  if ((session as any).isNewUser) {
    redirect('/partner/join');
  }
  return session;
}

export async function requireAdminAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  if (!(session as any).isAdmin) {
    redirect('/dashboard');
  }
  return session;
}
