import React from 'react'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BackButton from '@/components/BackButton'
import { getAdminLesson } from './lesson-edit.query'
import { LessonForm } from './LessonForm'
import { notFound } from 'next/navigation'
import { getRequiredAuthSession } from '@/lib/auth'

type EditLessonProps = {
  params: { lessonId: string; courseId: string }
}
const EditLesson = async ({ params }: EditLessonProps) => {
  const session = await getRequiredAuthSession()
  const lesson = await getAdminLesson({
    lessonId: params.lessonId,
    courseId: params.courseId,
    userId: session.user.id,
  })

  if (!lesson) {
    notFound()
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{lesson?.name}</LayoutTitle>
        <BackButton href={`/admin/courses/${params.courseId}/lessons`} />
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-[2]">
          <CardHeader>Details</CardHeader>
          <CardContent className="mt-6">
            <LessonForm defaultValues={lesson} courseId={params.courseId} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default EditLesson
