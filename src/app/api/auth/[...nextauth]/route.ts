import { login, loginWithGoogle } from "@/app/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: { email: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string, password: string
        };
        const user: any = await login({ email });
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account?.provider === 'credentials') {
        token.email = user.email;
        token.role = user.role;
        token.fullname = user.fullname;
      }
      if (account?.provider === 'google') {
        const data = {
          email: user.email,
          fullname: user.name,
          type: 'google',
        };
        const result = await loginWithGoogle(
          data, ((result: { status: boolean, data: any }) => {
            if (result.status) {
              token.email = result.data.email;
              token.role = result.data.role;
              token.fullname = result.data.fullname;
            }
          }));
      }
      return token;
    },
    async session({ session, token }: any) {
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('fullname' in token) {
        session.user.fullname = token.fullname;
      }
      if ('role' in token) {
        session.user.role = token.role;
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }