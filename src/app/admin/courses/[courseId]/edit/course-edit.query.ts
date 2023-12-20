import prisma from '@/lib/prisma'

export const getAdminCourseEdit = async ({
  courseId,
  userId,
}: {
  courseId: string
  userId: string
}) => {
  return await prisma.course.findUnique({
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
    },
  })
}
