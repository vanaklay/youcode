'use server'
import { z } from 'zod'
import { authenticatedAction } from '@/lib/action'
import prisma from '@/lib/prisma'
import { LessonFormSchema } from './lesson.schema'

const LessonActionEditProps = z.object({
  lessonId: z.string(),
  data: LessonFormSchema,
})

export const lessonActionEdit = authenticatedAction(
  LessonActionEditProps,
  async (props, { userId }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: props.lessonId,
        course: {
          creatorId: userId,
        },
      },
      data: props.data,
    })

    return {
      message: 'Lesson updated successfully',
      lesson,
    }
  }
)
