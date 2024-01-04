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
import { lessonActionEdit } from '../lesson.action'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type LessonFormProps = {
  defaultValues: LessonFormSchema & {
    id: string
  }
}

export const LessonForm = ({ defaultValues }: LessonFormProps) => {
  const form = useZodForm({
    schema: LessonFormSchema,
    defaultValues,
  })

  const router = useRouter()

  return (
    <Form
      form={form}
      onSubmit={async (values) => {
        const { data, serverError } = await lessonActionEdit({
          lessonId: defaultValues.id,
          data: values,
        })

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

      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}
