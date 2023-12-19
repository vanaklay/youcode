import React from 'react'
import { getRequiredAuthSession } from '@/lib/auth'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/Layout'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { Typography } from '@/components/ui/typography'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
})

const Edit = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const session = await getRequiredAuthSession()

  const handleAction = async (formData: FormData) => {
    'use server'

    const image = formData.get('image')
    const name = formData.get('name')
    const session = await getRequiredAuthSession()

    const safeData = FormSchema.safeParse({ image, name })

    if (!safeData.success) {
      const searchParams = new URLSearchParams()
      searchParams.set('error', 'Invalid data !')
      redirect(`/account/edit?${searchParams.toString()}`)
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: safeData.data,
    })

    revalidatePath('/account')
    redirect('/account')
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Settings</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="grid grid-cols-1 gap-1">
        <Card>
          <CardContent className="mt-6">
            <form action={handleAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="image">Image Url</Label>
                <Input
                  defaultValue={session.user.image}
                  name="image"
                  id="image"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input defaultValue={session.user.name} name="name" id="name" />
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

export default Edit
