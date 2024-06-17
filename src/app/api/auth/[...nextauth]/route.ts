import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import baseURL from "../../../../store/baseURL";
import axios from "axios";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (req.body?.token) {
          try {
            const userInfoResponse = await axios.get(
              `${baseURL}/user/user-info`,
              {
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${req.body?.token}`,
                },
              }
            );
            // cookies().set("accessToken", req.body?.token, {
            //   httpOnly: true,
            //   secure: process.env.NODE_ENV === "production",
            //   sameSite: "strict",
            // });
            const userInfoData = await userInfoResponse.data;
            return userInfoData;
          } catch (error) {
            console.error("Error during authentication:", error);
          }
          return null;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    newUser: "/registration",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user;
        session.expires = new Date(token.user.exp * 1000).toISOString();
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
