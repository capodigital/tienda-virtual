import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/app/prismadb'
import bcrypt from 'bcrypt'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'your email'
        },
        password: {
          label: 'Password',
          type: 'text',
          placeholder: 'your password'
        }
      },
      async authorize (credentials): Promise<any> {
        if (credentials?.email == null || credentials?.password == null) {
          throw new Error('Email and password required')
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (user?.password == null) {
          throw new Error('Invalid credentials')
        }
        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )
        if (!isCorrectedPassword) {
          throw new Error('Incorrect password')
        }
        return user
      }
    })
  ],
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user != null) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user != null) {
        token.uid = user.id
      }
      return token
    }

  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
  // adapter: PrismaAdapter(prisma),

}
