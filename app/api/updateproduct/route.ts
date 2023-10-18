import prisma from '@/app/prismadb'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function PATCH (request: Request): Promise<Response> {
  const body = await request.json()

  const {
    id,
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
    const updateProduct = await prisma.product.update({
      where: {
        id
      },
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
    return NextResponse.json(updateProduct)
  } catch (error) {
    console.log('Error updating product', error)
    return NextResponse.error()
  }
}
