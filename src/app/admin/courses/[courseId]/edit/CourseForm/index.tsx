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
import { courseActionEdit } from '../course.action'
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
        if (defaultValues?.id) {
          const { data, serverError } = await courseActionEdit({
            courseId: defaultValues.id,
            data: values,
          })

          if (data) {
            toast.success(data)
            router.push(`/admin/courses/${defaultValues.id}`)
            router.refresh()
            return
          }

          toast.error('Some error occurred', {
            description: serverError,
          })
          return
        } else {
          // create new course
        }
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
