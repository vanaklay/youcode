'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from '@/components/ui/form'
import { CourseFormSchema } from '../course.schema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { courseActionCreate, courseActionEdit } from '../course.action'
import SubmitButton from '@/components/form/SubmitButton'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export type CourseFormProps = {
  defaultValues?: CourseFormSchema & {
    id?: string
  }
}

export const CourseForm = ({ defaultValues }: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues,
  })

  const router = useRouter()

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        const { data, serverError } = defaultValues?.id
          ? await courseActionEdit({
              courseId: defaultValues.id,
              data: values,
            })
          : await courseActionCreate(values)

        if (data) {
          toast.success(data.message)
          router.push(`/admin/courses/${data.course.id}`)
          router.refresh()
          return
        }

        toast.error('Some error occurred', {
          description: serverError,
        })
        return
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
