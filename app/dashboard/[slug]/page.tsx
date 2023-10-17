/* eslint-disable @typescript-eslint/quotes */
import React from 'react'
import prisma from "@/app/prismadb"
import ImageGallery from '../ImageGallery'
import Info from '../Info'
import Review from '@/app/components/Review'
import ReviewSection from '../ReviewSection'
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"

export default async function Page ({ params }: { params: { slug: string } }): Promise<any> {
  const productId = params.slug
  const session = await getServerSession(options)
  const currentUserId = session?.user.id
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })
  const allReview = await prisma.review.findMany({
    where: {
      productId
    }
  })
  let averageRating = 0
  if (allReview.length > 0) {
    const totalRating = allReview.reduce((acc, review) => {
      return acc + review.rating
    }, 0)
    averageRating = totalRating / allReview.length
  }
  const urlString = product?.images
  return (
    <div className='max-w-[1280px] mx-auto px-5 py-5'>
      <div className='font-semibold text-2xl mb-2'>
        <a href="/">MODA MIA</a>
      </div>
      <hr />
      {(product != null) && (
        <div className='grid grid-cols-2 mt-10 gap-14'>
          {(urlString != null) && (
            <ImageGallery imageUrls={urlString} />
          )}
          <Info {...product} rating={averageRating} numbercomments={allReview.length} />
        </div>
      )}
      <div className='mb-20 mt-20'>
        <div className='flex items-center space-x-5 mb-10'>
          <span className='w-[5px] h-[30px] bg-purple-600 rounded-full inline-block'></span>
          <span className='font-medium text-xl'>Descripción del producto</span>
        </div>
        {product != null && (
          <div className='grid grid-cols-2'>
            <div className='fles flex-col justify-center'>
              <div className='grid grid-cols-3 gap-5 mb-5'>
                <div>
                  <h3 className='font-medium'>Categoría</h3>
                  <p className='text-sm text-purple-500'>{product.category}</p>
                </div>
                <div>
                  <h3 className='font-medium'>Estilo</h3>
                  <p className='text-sm text-purple-500'>{product.style}</p>
                </div>
                <div>
                  <h3 className='font-medium'>Marca</h3>
                  <p className='text-sm text-purple-500'>{product.store}</p>
                </div>
              </div>
              <div style={{ borderColor: `{${product.color.split(',').pop()}}` }} className={`leading-6 text-sm text-neutral-700 h-[200px] border-[1px] rounded-md p-4 overflow-scroll`} dangerouslySetInnerHTML={{ __html: product?.description }}></div>
            </div>
            <div className='flex justify-end relative items-center'>
              <img src={product.images.split(',').pop()} className='max-h-[300px] w-10/12 rounded-lg object-cover' alt="" />
              <span className='text-sm absolute bottom-2 right-2 text-black font-medium'>{product.title}</span>
            </div>
          </div>
        )}
      </div>
      <div className='mt-20 mb-20'>
        <div className='flex items-center space-x-5 mb-10'>
          <span className='w-[5px] h-[30px] bg-purple-600 rounded-full inline-block'></span>
          <span className='font-medium text-xl'>Comentarios y puntuaciones</span>
        </div>
        <div className='grid grid-cols-2'>
          <div>
            {allReview.map((review, index) => (
              <div key={review.id} className='mb-5'>
                <h1 className='mb-2 font-medium'>Comentario: {index + 1}</h1>
                <ReviewSection {...review} />
              </div>
            ))}
          </div>
          <Review productId={product?.id} userId={currentUserId} />
        </div>
      </div>
    </div>
  )
}
