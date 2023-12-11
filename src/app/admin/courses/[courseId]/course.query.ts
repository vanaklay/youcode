import prisma from '@/lib/prisma'

export const getCourse = async (courseId: string, userId: string) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      users: {
        select: {
          canceledAt: true,
          id: true,
          user: {
            select: {
              id: true,
              email: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  })

  const users = course?.users.map((user) => ({
    canceled: user.canceledAt ? true : false,
    ...user.user,
  }))

  return {
    ...course,
    users,
  }
}
