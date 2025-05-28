import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import user from "@/models/User";
import bcrypt from "bcryptjs";
import { session, SessionStrategy } from "next-auth";
export const authOptions = {
  providers: [
    CredentialsProvider({
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
        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        try {
          await dbConnect();
          const founduser = await user.findOne({
            email: email,
          });

          if (!founduser) {
            throw new Error("User not found");
          }
          const isPasswordValid = await bcrypt.compare(
            password,
            founduser.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
          return {
            id: founduser._id,
            email: founduser.email,
          };
        } catch (error) {
          throw new Error("Invalid credentials");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET || "defaultsecret",
};
