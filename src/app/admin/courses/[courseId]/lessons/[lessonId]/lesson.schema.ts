import { LessonState } from '@prisma/client'
import { z } from 'zod'

export const LESSON_STATE = ['HIDDEN', 'PUBLIC', 'PUBLISHED'] as const

export const LessonFormSchema = z.object({
  name: z.string().min(1).max(255),
  state: z.enum(LESSON_STATE),
})

export type LessonFormSchema = z.infer<typeof LessonFormSchema>
