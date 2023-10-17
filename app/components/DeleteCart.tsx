/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { type ReactElement } from 'react'
import axios from 'axios'
import { GoTrash } from 'react-icons/go'
import { useRouter } from 'next/navigation'

interface Props {
  productId?: string
  userId?: string
}

const DeleteCart = (props: Props): ReactElement => {
  const router = useRouter()
  const handleDelete = async (): Promise<any> => {
    try {
      await axios.delete('/api/cart', {
        data: {
          productId: props.productId,
          userId: props.userId
        }
      })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='cursor-pointer' onClick={handleDelete}>
        <GoTrash className='text-red-500' size={20}/>
    </div>
  )
}

export default DeleteCart
