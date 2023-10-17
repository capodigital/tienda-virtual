import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/app/prismadb'
import bcrypt from 'bcrypt'

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
          }),
          CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email:{
                    label: 'Email',
                    type: 'text',
                    placeholder: 'your email'
                },
                password: {
                    label: 'Password',
                    type: 'text',
                    placeholder: 'your password'
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required');
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user || !user.password) {
                    throw new Error('Invalid credentials');
                }
                const isCorrectedPassword = await bcrypt.compare(
                    credentials.password, 
                    user.password
                );
                if (!isCorrectedPassword) {
                    throw new Error('Incorrect password');
                }
                return user;

            }
        })
    ],
    pages: {
        signIn: '/signin',
        error: '/signin'
    },
    callbacks:{
        session: async ({session, token, user}) => {
            if(session?.user){
                session.user.id = token.uid;
            }
            return session
        },
        jwt: async ({user, token}) => {
            if(user){
                token.uid = user.id
            }
            return token
        }

    },
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
      },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    //adapter: PrismaAdapter(prisma),
    
    
    
};
