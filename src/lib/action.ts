import { createSafeActionClient } from 'next-safe-action'
import { getAuthSession } from './auth'

export const action = createSafeActionClient()

export const authenticatedAction = createSafeActionClient({
  middleware: async () => {
    const session = await getAuthSession()
    const user = session?.user
    const userId = user?.id
    if (!session) {
      throw new Error('You must be logged in to perform this action')
    }

    return { user, userId }
  },
})
