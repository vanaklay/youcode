import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { OpenCours } from '@/app/courses/openCourses.query'
import Link from 'next/link'

type CourseCardProps = {
  course: OpenCours
}
const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card>
        <CardHeader className="flex flex-row gap-2 space-y-0">
          <Avatar>
            <AvatarFallback>{course.name[0]}</AvatarFallback>
            {course.image && <AvatarImage src={course.image} />}
          </Avatar>
          <CardTitle>{course.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default CourseCard
