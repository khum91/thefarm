import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config'
import { z } from 'zod';
import user from '@/data/models/user';
import { User } from '@/data/definitions'
import bcrypt from 'bcrypt';
import { connect } from "@/data/dbConfig";


async function getUser(email: string): Promise<User | undefined> {
  connect()
  try {
    const result = await user.find({ email: email })
    if (!result) {
      throw { status: 404, message: 'User not found' }
    }
    return result[0];
  } catch (e) {
    throw e
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(10) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});