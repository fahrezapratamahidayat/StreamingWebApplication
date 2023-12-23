import { LoginUsers } from "@/lib/firebase/services";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
      },
    secret: process.env.NEXT_SECRET_KEY,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const users: any = await LoginUsers({ email, password });
                if(users){
                    const passwordMatch = await bcrypt.compare(password, users.password);
                    return passwordMatch ? users : null;
                }else{
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account, user, profile }) {
            if (account?.provider === "credentials") {
                token.email = user.email;
                token.name = user.name;
              }
              return token;
        },
        async session({ session, token }: any) {
            if ("email" in token) {
              session.user.email = token.email;
            }
            if ("name" in token) {
              session.user.name = token.fullname;
            }
            return session;
          },
    },
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

