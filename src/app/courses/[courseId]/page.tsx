import React from 'react'
import { getCourse } from './course.query'
import Course from './Course'
import { getAuthSession } from '@/lib/auth'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'

type CourseProps = {
  params: { courseId: string }
}
const CoursePage = async ({ params }: CourseProps) => {
  const session = await getAuthSession()
  const course = await getCourse(params.courseId, session?.user.id)
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Your Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Course course={course} />
      </LayoutContent>
    </Layout>
  )
}

export default CoursePage
