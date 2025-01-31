import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import axios from 'axios';

const providers: Provider[] = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: '123', type: 'text', placeholder: 'your@email.com' },
      password: { label: '123', type: 'password' },
    },
    async authorize(credentials) {
      try {
        // Send credentials to your API
        const response = await axios.post('https://k02nwn2ep7.execute-api.ap-northeast-1.amazonaws.com/dev/login/', {
          email: credentials?.email,
          password: credentials?.password,
        });

        const user = response.data;

        // If login is successful, return user object
        if (user) {
          return user;
        }

        // If login fails, return null
        return null;
      } catch (error) {
        console.error('Login failed:', error);
        return null;
      }
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
      return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async authorized({ auth: session, request: { nextUrl } }) {
  
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith('/public');
  
      if (isLoggedIn || isPublicPage) {
        return true;
      }
  
      return false; 
    },
  },
  
});
