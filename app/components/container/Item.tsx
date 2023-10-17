import React from 'react'
// import { AiOutlineHeart } from 'react-icons/ai'
import Link from 'next/link'
import prisma from '@/app/prismadb'

const Item = async (): Promise<any> => {
  const products = await prisma.product.findMany()

  if (products.length === 0) {
    return (
            <div>No hay nada para mostrar</div>
    )
  }
  return (
    <div>
        <h1 className='py-3 text-xl '>Ropa</h1>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-20'>
            {products.map((product) => (
                <div key={product.id}>
                    <Link href={`/dashboard/${product.id}`}>
                        <div className='relative rounded-lg'>
                            <img
                            className='w-[250px] h-[300px] object-cover object-top rounded-lg'
                            src={product.images.split(',')[0]}
                            alt="" />
                        </div>
                        <div className='flex items-center justify-between mt-4'>
                            <div>
                                <h1 className='text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden'>{product.title}</h1>
                                <p className='text-[13px] opacity-60'>{product.store}</p>
                            </div>
                            <span className='px-2 font-medium bg-gray-100 rounded-lg'>${product.price}.00</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Item
