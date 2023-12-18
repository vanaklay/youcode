import React from 'react'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import CourseCard from '@/components/CourseCard'
import { getOpenCourses } from '../courses/openCourses.query'
import { getAuthSession } from '@/lib/auth'
import NotAuthenticatedError from '@/features/auth/NotAuthenticatedError/Index'

const OpenCoursesPage = async () => {
  const session = await getAuthSession()

  if (!session?.user.id) {
    return <NotAuthenticatedError />
  }

  const courses = await getOpenCourses(session?.user.id)

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>My Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-1 md:grid-cols-2 2xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </LayoutContent>
    </Layout>
  )
}

export default OpenCoursesPage
