import prisma from '@/lib/prisma'

export const getOpenCourses = async () => {
  return await prisma.course.findMany({
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
