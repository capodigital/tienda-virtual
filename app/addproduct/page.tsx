/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React, { type ReactElement } from 'react'
import Productform from './productform'

type Props = {}

const page = (props: Props): ReactElement => {
  return (
    <div><Productform /></div>
  )
}

export default page
