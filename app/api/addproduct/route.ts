import prisma from '@/app/prismadb'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function POST (request: Request): Promise<any> {
  const body = await request.json()
  const {
    title,
    description,
    category,
    style,
    size,
    inventory,
    color,
    price,
    images,
    userId,
    store
  } = body

  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        style,
        size,
        inventory,
        color,
        price,
        images,
        userId,
        store
      }
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log('Error creating the product', error)
    return NextResponse.error()
  }
}
