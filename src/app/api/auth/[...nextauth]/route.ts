import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import baseURL from "../../../../store/baseURL";
import axios from "axios";

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
            const userInfoData = await userInfoResponse.data.user;
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
    signIn: "/",
    signOut: "/",
    newUser: "/registration",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
