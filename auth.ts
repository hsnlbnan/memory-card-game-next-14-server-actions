import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;
    console.log("user = ", user);
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log("email = ", email);
          const user = await getUser(email);
          console.log("user = ", user);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("passwordsMatch = ", passwordsMatch);
          if (passwordsMatch) return user;
          console.log("Passwords do not match.");
        }

        return null;
      },
    }),
  ],
});
