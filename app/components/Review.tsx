/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { type ReactElement, useState } from 'react'
import ReactStars from 'react-rating-star-with-type'
import axios from 'axios'
import { useRouter } from 'next/navigation'
interface Props {
  productId?: string
  userId?: string
}

const Review = ({ productId, userId }: Props): ReactElement => {
  const router = useRouter()
  const defaultReviwForm = {
    star: 0,
    comment: '',
    productId,
    userId
  }

  const [reviewForm, setReviewForm] = useState(defaultReviwForm)

  const onChange = (nextValue: any): void => {
    setReviewForm(prevState => ({ ...prevState, star: nextValue }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setReviewForm(prevState => ({ ...prevState, [name]: value }))
  }

  const postData = async (): Promise<any> => {
    try {
      const response = await axios.post('/api/review', reviewForm)
      setReviewForm(defaultReviwForm)
      console.log(response.data)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
        <h1 className='text-xl font-medium mb-4'>Danos tu opinión</h1>
        <h2 className='mb-2'>Puntúanos</h2>
        <ReactStars
         onChange={onChange}
         value={defaultReviwForm.star}
         size={17}
         isEdit={true}
         activeColors={['red', 'orange', '#FFCE00', '#9177FF', '#8568FC']}
         />
         <h2 className='mt-4'>Escribe aquí tu comentario</h2>
         <div>
            <input className='border-[1px] border-purple-300 rounded-lg w-full h-[40px] focus:border-purple-500 outline-none px-2 mt-2'
            name='comment'
            onChange={handleChange}
            value={reviewForm.comment}
             type="text" />
         </div>
         <button className='px-5 p-2 border-[1px] bg-purple-600 text-white rounded-lg mt-5' onClick={postData}>Puntuar</button>
    </div>
  )
}

export default Review
