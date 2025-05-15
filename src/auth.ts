import Google from "next-auth/providers/google";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import { connectToDatabase } from "./configs/mongoose";
import UserModel from "./models/user.model";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    role: string;
  }
}
export const authOptions = {
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: {
    async createUser(user) {
      console.log("Creating user:", user);
      await connectToDatabase();

      const newUser = await UserModel.create({
        email: user.email,
        name: user.name,
        image: user.image,
        role: "user",
      });
      return newUser.toObject();
    },
    async getUser(id) {
      await connectToDatabase();
      console.log("Getting user by ID:", id);
      const user = await UserModel.findById(id);
      return user?.toObject() || null;
    },
    async getUserByEmail(email) {
      await connectToDatabase();
      console.log("Getting user by email:", email);
      const user = await UserModel.findOne({ email });
      return user?.toObject() || null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      await connectToDatabase();
      console.log("Getting user by account:", { providerAccountId, provider });
      const user = await UserModel.findOne({
        provider: provider,
        providerAccountId: providerAccountId,
      });
      return user?.toObject() || null;
    },
    async updateUser(user) {
      await connectToDatabase();
      console.log("Updating user:", user);
      const updatedUser = await UserModel.findByIdAndUpdate(user.id, user, {
        new: true,
      });
      return updatedUser.toObject();
    },
    async linkAccount(account) {
      await connectToDatabase();
      console.log("Linking account:", account);
      await UserModel.updateOne(
        { _id: account.userId },
        {
          $set: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        }
      );
      return account;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt" as const,
    maxAge: 10 * 24 * 60 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        console.log("JWT callback user:", user);
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
