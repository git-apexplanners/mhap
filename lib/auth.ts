import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { User } from "next-auth";

// Extend the User type to include role
interface CustomUser extends User {
  role?: string;
}

// Extend the Session and JWT types
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  interface JWT {
    role?: string;
  }
}

// In a real application, you would store users in the database
// For simplicity, we're using a hardcoded admin user
const users = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    // This is a hashed version of "admin123"
    password: "$2b$10$8OxDEuDS7HN5.Z0vRrOUB.jEX4V9JR9K9LYf1.zjH.8.z7.JRKUWC",
    role: "admin",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((user) => user.email === credentials.email);
        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Cast user to CustomUser to access the role property
        token.role = (user as CustomUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Use type assertion to handle the role property
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

// Helper function to check if a user is authenticated and has admin role
// Define a more specific type for the session
interface UserSession {
  user?: {
    role?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // User properties can vary
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Session properties can vary
}

export function isAdmin(session: UserSession | null | undefined) {
  return session?.user?.role === "admin";
}
