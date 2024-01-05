import React from 'react'
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getRequiredAuthSession } from '@/lib/auth'
import { getCourseLessons } from './lessons.query'
import LessonItem from './LessonItem'
import BackButton from '@/components/BackButton'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import SubmitButton from '@/components/form/SubmitButton'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

type LessonsProps = {
  params: { courseId: string }
}
const Lessons = async ({ params }: LessonsProps) => {
  const session = await getRequiredAuthSession()
  const course = await getCourseLessons(params.courseId, session.user.id)

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>{course?.name} - All lessons</LayoutTitle>
        <BackButton href={`/admin/courses/${params.courseId}`} />
      </LayoutHeader>
      <LayoutActions>
        <Link
          href={`/admin/courses/${params.courseId}/lessons/new`}
          className={buttonVariants({ variant: 'secondary' })}
        >
          New lesson
        </Link>
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course?.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                courseId={params.courseId}
              />
            ))}
            <form>
              <SubmitButton
                size="sm"
                variant="secondary"
                className="w-full"
                formAction={async () => {
                  'use server'

                  const session = await getRequiredAuthSession()

                  const courseId = params.courseId

                  // Authorize the user
                  await prisma.course.findFirstOrThrow({
                    where: {
                      creatorId: session.user.id,
                      id: courseId,
                    },
                  })

                  const lesson = await prisma.lesson.create({
                    data: {
                      name: 'Draft Lesson',
                      rank: 'aaaaa',
                      state: 'HIDDEN',
                      content: '## Default content',
                      courseId,
                    },
                  })

                  redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`)
                }}
              >
                Create lesson
              </SubmitButton>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default Lessons
