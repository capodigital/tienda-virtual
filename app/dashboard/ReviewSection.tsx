'use client'
import React, { type ReactElement } from 'react'
import ReactStars from 'react-rating-star-with-type'

interface Props {
  rating: number
  commentry: string
  productId: string
  userId: string
}

const ReviewSection = ({ rating, commentry, productId, userId }: Props): ReactElement => {
  return (
        <div>
            <ReactStars
                value={rating}
                isEdit={true}
                activeColors={['red', 'orange', '#FFCE00', '#9177FF', '#8568FC']}
            />
            <p className='mt-2'>{commentry}</p>
        </div>
  )
}

export default ReviewSection
