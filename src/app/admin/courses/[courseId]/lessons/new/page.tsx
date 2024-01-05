import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import { getRequiredAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCourse } from '@/app/courses/[courseId]/course.query'
import { LessonForm } from '../[lessonId]/LessonForm'

type AdminCreateLessonsProps = {
  params: { courseId: string }
}
const AdminCreateLesson = async ({ params }: AdminCreateLessonsProps) => {
  const session = await getRequiredAuthSession()
  const course = await getCourse(params.courseId, session.user.id)

  if (!session.user.id || !course.id) {
    notFound()
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{course.name} - Create lesson</LayoutTitle>
        <Link
          href={`/admin/courses/${params.courseId}/lessons`}
          className="flex flex-row"
        >
          <ArrowLeft />
          Back
        </Link>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-1">
        <Card>
          <CardContent className="mt-6">
            <LessonForm courseId={params.courseId} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default AdminCreateLesson
