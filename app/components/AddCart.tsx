/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { type ReactElement } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CiShoppingCart } from 'react-icons/ci'

interface Props {
  productId?: string
}

const AddCart = ({ productId }: Props): ReactElement => {
  const { data: session } = useSession()
  const id = session?.user.id
  const router = useRouter()

  const handleCart = async (): Promise<any> => {
    if (session?.user != null) {
      try {
        await axios.post('/api/cart', {
          productId,
          userId: id
        })
          .then((response) => {
            router.push('/cart')
            console.log(response)
          })
      } catch (error) {
        console.log(error)
      }
    } else {
      router.push('/signin')
    }
  }
  return (
    <div onClick={handleCart} className='flex items-center space-x-4 bg-purple-600 text-white px-6 p-2 rounded-full cursor-pointer'>
      <span>
        <CiShoppingCart size={24} />
      </span>
      <span className='text-wm'>Añadir al carrito</span>
    </div>
  )
}

export default AddCart
