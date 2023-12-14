import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type CourseCardProps = {
  course: {
    name: string
    image: string
    id: string
    creator: {
      image: string | null
      name: string | null
    }
  }
}
const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-2 space-y-0">
        <Avatar>
          <AvatarFallback>{course.name[0]}</AvatarFallback>
          {course.image && <AvatarImage src={course.image} />}
        </Avatar>
        <CardTitle>{course.name}</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default CourseCard
