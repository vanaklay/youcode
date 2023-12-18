import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export const getOpenCourses = async (userId?: string) => {
  return await prisma.course.findMany({
    where: userId
      ? {
          users: {
            some: {
              userId,
            },
          },
        }
      : undefined,
    select: {
      name: true,
      image: true,
      id: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  })
}

export type OpenCours = Prisma.PromiseReturnType<typeof getOpenCourses>[number]
