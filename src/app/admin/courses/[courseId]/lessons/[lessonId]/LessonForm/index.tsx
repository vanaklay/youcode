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
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/form/SubmitButton'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LESSON_STATE, LessonFormSchema } from '../lesson.schema'
import { lessonActionCreate, lessonActionEdit } from '../lesson.action'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export type LessonFormProps = {
  defaultValues?: LessonFormSchema & {
    id: string
  }
  courseId: string
}

export const LessonForm = ({ defaultValues, courseId }: LessonFormProps) => {
  const form = useZodForm({
    schema: LessonFormSchema,
    defaultValues,
  })

  const router = useRouter()

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        const { data, serverError } = defaultValues?.id
          ? await lessonActionEdit({
              lessonId: defaultValues.id,
              data: values,
            })
          : await lessonActionCreate({ data: values, courseId })

        if (data) {
          toast.success(data.message)
          router.refresh()
          return
        }

        toast.error('Some error occurred', {
          description: serverError,
        })
        return
      }}
      className="flex flex-col gap-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="rank"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rank</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state of the lesson" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {LESSON_STATE.map((state) => (
                  <SelectItem key={crypto.randomUUID()} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
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
