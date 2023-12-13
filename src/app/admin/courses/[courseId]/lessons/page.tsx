import React from 'react'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getRequiredAuthSession } from '@/lib/auth'
import { getLessons } from './lessons.query'
import LessonItem from './LessonItem'

type LessonsProps = {
  params: { courseId: string }
}
const Lessons = async ({ params }: LessonsProps) => {
  const session = await getRequiredAuthSession()
  const lessons = await getLessons(params.courseId, session.user.id)

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Lessons . {lessons?.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {lessons?.lessons.map((lesson) => (
              <LessonItem key={lesson.id} lesson={lesson} />
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default Lessons
