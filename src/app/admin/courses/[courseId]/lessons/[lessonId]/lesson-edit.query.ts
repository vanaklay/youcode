import prisma from '@/lib/prisma'

export const getAdminLesson = async ({
  lessonId,
  courseId,
  userId,
}: {
  courseId: string
  lessonId: string
  userId: string
}) => {
  return await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      courseId: courseId,
      course: {
        creatorId: userId,
      },
    },
    select: {
      id: true,
      name: true,
      state: true,
    },
  })
}
