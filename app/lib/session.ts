import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

export async function getSession (): Promise<any> {
  return await getServerSession(options)
}

export async function getCurrentUser (): Promise<any> {
  const session = await getSession()
  return session?.user.id
}
