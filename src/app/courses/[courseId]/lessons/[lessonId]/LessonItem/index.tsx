import React from 'react'
import { CourseLessonItem } from '../../../course.query'
import { Typography } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, CircleDashed } from 'lucide-react'

type LessonItemProps = {
  lesson: CourseLessonItem
}

export const getLessonIcon = (status: CourseLessonItem['progress']) => {
  if (status === 'COMPLETED') return CheckCircle

  if (status === 'IN_PROGRESS') return Circle

  return CircleDashed
}

const LessonItem = ({ lesson }: LessonItemProps) => {
  const Icon = getLessonIcon(lesson.progress)
  return (
    <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
      <Icon size={16} />
      <Typography variant="small">{lesson.name}</Typography>
    </div>
  )
}

export default LessonItem
