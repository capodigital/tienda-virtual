/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React, { type ReactElement } from 'react'
import SigninForm from './signinForm'

type Props = {}

const page = (props: Props): ReactElement => {
  return (
    <SigninForm/>
  )
}

export default page
