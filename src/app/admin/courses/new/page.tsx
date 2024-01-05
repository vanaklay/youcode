import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CourseForm } from '../[courseId]/edit/CourseForm'

const AdminCreateCourse = async () => {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Create Course</LayoutTitle>
        <Link href={`/admin/courses/`} className="flex flex-row">
          <ArrowLeft />
          Back
        </Link>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-1">
        <Card>
          <CardContent className="mt-6">
            <CourseForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default AdminCreateCourse
