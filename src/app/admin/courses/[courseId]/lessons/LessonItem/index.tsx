import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { Lesson } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export type LessonItemProps = {
  lesson: Lesson
  courseId: string
}
const LessonItem = ({ lesson, courseId }: LessonItemProps) => {
  return (
    <Link href={`/admin/courses/${courseId}/lessons/${lesson.id}`}>
      <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <Typography variant="large">{lesson.name}</Typography>
        <Badge className="ml-auto">{lesson.state}</Badge>
      </div>
    </Link>
  )
}

export default LessonItem
