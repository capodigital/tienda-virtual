import Link from 'next/link'
import React, { type ReactElement } from 'react'
import Filter from './Filter'
import Item from './Item'

const Container = (): ReactElement => {
  return (
    <div>
      <div className='flex'>
        <Link href='/filters' className='opacity-60'>
          <div>
            <Filter />
          </div>
        </Link>
        <div className='px-20'>
          <Item />
        </div>
      </div>
    </div>
  )
}

export default Container
