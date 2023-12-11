import React from 'react'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableHead, TableHeader } from '@/components/ui/table'
import { getRequiredAuthSession } from '@/lib/auth'
import { getCourse } from './course.query'

const Course = async ({ params }: { params: { courseId: string } }) => {
  const session = await getRequiredAuthSession()
  const course = await getCourse(params.courseId, session.user.id)

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-4">
            <Table>
              <TableHeader>
                <TableHead>{course?.name}</TableHead>
              </TableHeader>
              <TableBody></TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default Course
