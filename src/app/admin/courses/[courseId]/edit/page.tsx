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
import { CourseForm } from './CourseForm'
import { getAdminCourseEdit } from './course-edit.query'

type AdminEditCourseProps = {
  params: { courseId: string }
}
const AdminEditCourse = async ({ params }: AdminEditCourseProps) => {
  const session = await getRequiredAuthSession()
  const course = await getAdminCourseEdit({
    courseId: params.courseId,
    userId: session.user.id,
  })

  if (!course) {
    notFound()
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit Course</LayoutTitle>
        <Link href={`/admin/courses/${course.id}`} className="flex flex-row">
          <ArrowLeft />
          Back
        </Link>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-1">
        <Card>
          <CardContent className="mt-6">
            <CourseForm defaultValues={course} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default AdminEditCourse
