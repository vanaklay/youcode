import prisma from '@/lib/prisma'
import { $Enums, Prisma } from '@prisma/client'

export const getCourse = async (courseId: string, userId: string = '-') => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      lessons: {
        where: {
          state: {
            in: ['PUBLIC', 'PUBLISHED'],
          },
        },
        select: {
          id: true,
          name: true,
          state: true,
          users: {
            where: {
              id: userId,
            },
            select: {
              progress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          image: true,
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

  const lessons = course?.lessons.map((lesson) => {
    const progress = lesson.users[0]?.progress ?? 'NOT_STARTED'
    return { ...lesson, progress }
  })

  return { ...course, lessons }
}

export type CourseCard = NonNullable<Prisma.PromiseReturnType<typeof getCourse>>

export type CourseLessonItem = {
  progress: $Enums.Progress
  id: string
  name: string
  users: {
    progress: $Enums.Progress
  }[]
  state: $Enums.LessonState
}
