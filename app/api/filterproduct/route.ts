/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prisma from '@/app/prismadb'
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export async function GET (request: Request): Promise<Response> {
  try {
    // const searchParams = new URLSearchParams(request.credentials)
    const { searchParams } = new URL(request.url)

    const categories = searchParams.getAll('categories[]')
    const colors = searchParams.getAll('colors[]')
    const sizes = searchParams.getAll('size[]')

    const minPrice = parseInt(searchParams.get('price[min]') ?? '0')
    const maxPrice = parseInt(searchParams.get('price[max]') ?? '100000')
    const products = await prisma.product.findMany({
      where: {
        OR: [
          ...categories.map((category) => ({ category: { contains: category } })),
          ...sizes.map((size) => ({ size: { contains: size } })),
          ...colors.map((color) => ({ color: { contains: color } })),
          { price: { gte: minPrice, lte: maxPrice } }
        ]
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error selecting product', error)
    return NextResponse.error()
  }
}
