import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CourseCard } from '../course.query'
import MarkdownProse from '@/features/mdx/MarkdownProse'
import LessonItem from '../lessons/[lessonId]/LessonItem'

type CourseProps = {
  course: CourseCard
}
const Course = ({ course }: CourseProps) => {
  if (!course) {
    return null
  }
  return (
    <div className="flex flex-col items-start gap-4 lg:flex-row">
      <Card className="flex-[2]">
        <CardHeader className="flex flex-row gap-2 space-y-0">
          <Avatar>
            {course.name && <AvatarFallback>{course.name[0]}</AvatarFallback>}
            {course.image && <AvatarImage src={course.image} />}
          </Avatar>
          <div className="flex flex-col gap-3">
            <CardTitle>{course.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Avatar>
                {course.creator?.name && (
                  <AvatarFallback>{course.creator?.name[0]}</AvatarFallback>
                )}
                {course.creator?.image && (
                  <AvatarImage src={course.creator?.image} />
                )}
              </Avatar>
              <CardTitle>{course.creator?.name}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <MarkdownProse markdown={course.presentation} />
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {course.lessons?.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default Course
