import { login } from '@/services/auth';
import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId;
        token.username = token.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.userId;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // Return null if user data could not be retrieved
        const response = await login(username, password);

        return {
          ...response.user,
          id: response.user.userId,
          username: response.user.username,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export const getServerAuthSession = () => getServerSession(authOptions);
export { handler as GET, handler as POST };
