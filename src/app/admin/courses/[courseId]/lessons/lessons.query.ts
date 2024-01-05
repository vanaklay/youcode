import prisma from '@/lib/prisma'

export const getCourseLessons = async (courseId: string, userId?: string) => {
  return await prisma.course.findUnique({
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      name: true,
      lessons: true,
    },
  })
}
