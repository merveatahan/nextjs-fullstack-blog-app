import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/models/User";
import { signJwtToken } from "@/lib/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "text", placeholder: "Password" },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
          throw new Error("Invalid password");
        } else {
          const { password, ...currentUser } = user._doc;
          const accessToken = signJwtToken(currentUser, { expiresIn: "5d" });
          const refreshToken = signJwtToken(currentUser);

          return {
            ...currentUser,
            accessToken,
            refreshToken,
          };
        }
      },
    }),
  ],

  pages: {
    signIn: "/LoginPage",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token._id = user._id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 10,
  },
  session: {
    strategy: "jwt",
    maxAge: 720,
    cookie: {
      maxAge: 720,
    },
  },

  secret: process.env.REFRESH_TOKEN_SECRET,
  secret: process.env.JWT_SECRET,

};
export default NextAuth(authOptions);
