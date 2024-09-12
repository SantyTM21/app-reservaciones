import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { Usuario } from '@/app/lib/definitions';
import { authConfig } from './auth.config';

async function getUsuario(email: string): Promise<Usuario | undefined> {
  try {
    const user = await sql<Usuario>`SELECT * FROM usuarios WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Fallo al obtener el usuario:', error);
    throw new Error('Fallo al obtener el usuario.');
  }
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(3) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email: userEmail, password } = parsedCredentials.data;

          const user = await getUsuario(userEmail);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        }
        console.log('Credenciales invalidas');
        return null;
      },
    }),
  ],
});
