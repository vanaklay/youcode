import { getAuthSession } from '@/lib/auth'
import React from 'react'
import SignIn from './SignIn'
import { SignOut } from './SignOut'

const Auth = async () => {
  const session = await getAuthSession()
  const user = session?.user

  if (!user) {
    return <SignIn />
  }

  return <SignOut user={user} />
}

export default Auth
