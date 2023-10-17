/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React, { type ReactElement } from 'react'
import SignForm from './signForm'

type Props = {}

const page = (props: Props): ReactElement => {
  return (
    <SignForm />
  )
}

export default page
