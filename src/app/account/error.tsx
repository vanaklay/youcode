'use client'

import { useEffect } from 'react'
import NotAuthenticatedError from '@/features/auth/NotAuthenticatedError/Index'

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

  return <NotAuthenticatedError />
}
