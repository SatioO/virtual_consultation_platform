import { login } from '@/services/auth';
import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.name = user.name;
        token.email = user.email;
      }

      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id as number;
      session.token = token.token;
      session.user.name = token.name;
      session.user.email = token.email;
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
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // Return null if user data could not be retrieved
        const response = await login(username, password);
        const user = response.user;

        return {
          ...user,
          id: +user.userId,
          name: `${user.name.givenName} ${user.name.familyName}`,
          email: user.email,
          token: response.accessToken,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export const getServerAuthSession = () => getServerSession(authOptions);
export { handler as GET, handler as POST };
