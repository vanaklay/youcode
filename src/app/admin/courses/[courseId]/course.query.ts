import prisma from '@/lib/prisma'

export const getAdminCourse = async ({
  courseId,
  userId,
  userPage,
}: {
  courseId: string
  userId: string
  userPage: number
}) => {
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
        take: 5,
        skip: Math.max(0, userPage * 5),
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
