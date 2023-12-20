import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getAdminCourse } from '../course.query'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { getRequiredAuthSession } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string(),
})

type AdminEditCourseProps = {
  params: { courseId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
const AdminEditCourse = async ({
  searchParams,
  params,
}: AdminEditCourseProps) => {
  const page = Number(searchParams.page ?? 1)
  const session = await getRequiredAuthSession()
  const course = await getAdminCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  })

  const handleAction = async (formData: FormData) => {
    'use server'

    const image = formData.get('image')
    const name = formData.get('name')
    const presentation = formData.get('presentation')
    const session = await getRequiredAuthSession()

    const safeData = FormSchema.safeParse({ image, name, presentation })

    if (!safeData.success) {
      const searchParams = new URLSearchParams()
      searchParams.set('error', 'Invalid data !')
      redirect(`/admin/courses/${course.id}/edit?${searchParams.toString()}`)
    }

    await prisma.course.update({
      where: {
        id: course.id,
        creatorId: session.user.id,
      },
      data: safeData.data,
    })

    revalidatePath(`/admin/courses/${course.id}`)
    redirect(`/admin/courses/${course.id}`)
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
            <form action={handleAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image Url</Label>
                <Input defaultValue={course.image} name="image" id="image" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input defaultValue={course.name} name="name" id="name" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="presentation">Presentation</Label>
                <Textarea
                  defaultValue={course.presentation}
                  name="presentation"
                  id="presentation"
                />
              </div>
              {searchParams.error && (
                <Typography variant="small">
                  Error: {searchParams.error as string}
                </Typography>
              )}
              <Button>Submit</Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default AdminEditCourse
