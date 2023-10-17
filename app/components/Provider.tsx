'use client'
import React, { type ReactElement, type ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface Props {
  children: ReactNode
}

const Provider = ({ children }: Props): ReactElement => {
  return (
        <SessionProvider>
            {children}
        </SessionProvider>
  )
}

export default Provider
