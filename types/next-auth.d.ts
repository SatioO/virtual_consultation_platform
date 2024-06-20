import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    name: string;
    token: string;
    roles: string[];
  }

  interface Session {
    token?: string;
    user: {
      id: number;
      token?: string;
      roles: string[];
    } & DefaultSession['user'];
  }
  interface Account {
    access_token: string;
    user: {
      token?: string;
      roles: string[];
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    username?: string | null;
    token: string;
  }
}
