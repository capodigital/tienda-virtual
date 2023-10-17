import React from 'react'
import prisma from '@/app/prismadb'
import Edit from '../Edit'

const EditProduct = async ({ params }: { params: { slug: string } }): Promise<any> => {
  const productId = params.slug

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (product === null) {
      return <div>Producto no encontrado</div>
    }

    return (
            <div>
                <Edit {...product}/>
            </div>
    )
  } catch (error) {
    console.log('Error', error)
    return <div>Error recuperando el producto</div>
  }
}

export default EditProduct
