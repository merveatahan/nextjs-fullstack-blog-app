import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { signJwtToken, signRefreshToken, verifyRefreshToken } from "@/lib/jwt";
import bcrypt from "bcrypt";

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
          throw new Error("Invalid input");
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (comparePass) {
          const { password, ...currentUser } = user._doc;
          const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });
          const refreshToken = signRefreshToken(currentUser, {
            expiresIn: "1d",
          });

          return {
            ...currentUser,
            accessToken,
            refreshToken,
          };
        } else {
          throw new Error("Invalid password");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token._id = user._id;
      }

      // Refresh token kontrolü
      if (token && token.refreshToken) {
        const isRefreshTokenValid = verifyRefreshToken(token.refreshToken);
        if (!isRefreshTokenValid) {
          // Refresh token süresi dolduğunda otomatik çıkış yap
          throw new Error("Refresh token expired");
        }
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
};

export default NextAuth(authOptions);
