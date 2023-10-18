import prisma from '@/app/prismadb'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function POST (request: Request): Promise<Response> {
  const body = await request.json()
  const {
    star,
    comment,
    productId,
    userId
  } = body

  try {
    const review = await prisma.review.create({
      data: {
        rating: star,
        commentry: comment,
        productId,
        userId
      }
    })
    return NextResponse.json(review)
  } catch (error) {
    console.log('Error creating review', error)
    return NextResponse.error()
  }
}
