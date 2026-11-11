import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./db"; // Fixed: relative to lib/ folder
import User from "../models/User"; // Correct: models/ is sibling to lib/
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const inputEmail = credentials.email.toLowerCase().trim();
        const inputPassword = credentials.password.trim();

        // --- A. HARDCODED ADMIN CHECK ---
        const ADMIN_EMAIL = "aishwaryaarts@gmail.com";
        const ADMIN_PASSWORD = "123456";

        if (inputEmail === ADMIN_EMAIL && inputPassword === ADMIN_PASSWORD) {
          return {
            id: "admin-1",
            name: "Akash",
            email: ADMIN_EMAIL,
            role: "admin",
            image: null,
          };
        }

        // --- B. DATABASE CUSTOMER CHECK ---
        await connectDB();
        const user = await User.findOne({ email: inputEmail }).select("+password");

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(inputPassword, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: `${user.firstName} ${user.lastName || ""}`.trim(),
          email: user.email,
          image: user.avatar?.startsWith("data:") ? null : user.avatar,
          role: user.role || "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const normalizedEmail = user.email.toLowerCase().trim();
          const existingUser = await User.findOne({ email: normalizedEmail });

          if (!existingUser) {
            await User.create({
              firstName: profile?.given_name || user.name?.split(" ")[0] || "User",
              lastName: profile?.family_name || user.name?.split(" ")[1] || "",
              email: normalizedEmail,
              avatar: user.image,
              role: "user",
              authProvider: "google",
            });
          }
          return true;
        } catch (error) {
          console.error("Google Sign-In DB Error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        const isBase64 = typeof user.image === "string" && user.image.startsWith("data:");
        token.picture = isBase64 ? null : user.image;
      }
      if (trigger === "update" && session?.image) {
        const isBase64Update = session.image.startsWith("data:");
        token.picture = isBase64Update ? null : session.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};