import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import SignIn from '../SignIn'

const NotAuthenticatedError = () => {
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

export default NotAuthenticatedError
