import prisma from '@/app/prismadb'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET (request: Request): Promise<any> {
  try {
    const allCategories = await prisma.product.findMany({
      select: {
        category: true
      }
    })

    return NextResponse.json(allCategories)
  } catch (error) {
    console.log('Error fetching allcategories', error)
    return NextResponse.error()
  }
}
