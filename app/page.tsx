// import Image from 'next/image'
import Navbar from './components/Navbar'
import React from 'react'
// import { getCurrentUser } from './lib/session'
import Container from './components/container/Container'

export default async function Home (): Promise<any> {
  // const user = await getCurrentUser()

  return (
    <div className='px-5 mx-auto max-w-[1280px]'>
      <Navbar />
      <hr />
      <Container />
    </div>
  )
}
