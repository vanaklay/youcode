import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Typography } from '@/components/ui/typography'
import { Lesson } from '@prisma/client'
import Link from 'next/link'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export type SortableLessonItemProps = {
  lesson: Lesson
  courseId: string
}
const SortableLessonItem = ({ lesson, courseId }: SortableLessonItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Link
      href={`/admin/courses/${courseId}/lessons/${lesson.id}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
        <Typography variant="large">{lesson.name}</Typography>
        <Badge className="ml-auto">{lesson.state}</Badge>
      </div>
    </Link>
  )
}

export default SortableLessonItem
