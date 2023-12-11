import React from 'react'
import { getRequiredAuthSession } from '@/lib/auth'
import AccountCard from './AccountCard'

const Account = async () => {
  const session = await getRequiredAuthSession()

  return (
    <div className="m-4 h-full overflow-hidden rounded-[0.5rem] border bg-background p-8 shadow">
      <AccountCard user={session.user} />
    </div>
  )
}

export default Account
