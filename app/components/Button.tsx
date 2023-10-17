/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { type ReactElement } from 'react'
import axios from 'axios'

interface Props {
  allIds?: string[]
  userId?: string
}

const Button = ({ allIds, userId }: Props): ReactElement => {
  const onCheckout = async (): Promise<any> => {
    const response = await axios.post('/api/checkout', {
      productIds: allIds,
      userId
    })
    window.location = response.data.url
  }
  return (
    <div className='flex items-center justify-center mt-20 cursor-pointer'>
        <span onClick={onCheckout} className='px-10 p-2 text-white bg-purple-600 rounded-full'>
            Comprar
        </span>
    </div>
  )
}

export default Button
