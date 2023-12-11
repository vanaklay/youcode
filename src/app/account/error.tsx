'use client'

import { useEffect } from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import SignIn from '@/features/auth/SignIn'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>You need to be logged in to view this page</CardTitle>
      </CardHeader>
      <CardFooter>
        <SignIn />
      </CardFooter>
    </Card>
  )
}
