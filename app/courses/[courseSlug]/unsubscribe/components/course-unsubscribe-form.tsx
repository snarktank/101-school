'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { jsonFetch } from '@/lib/json-fetch'

const formSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof formSchema>

interface CourseUnsubscribeProps {
  courseId: string
  defaultEmail?: string
}

export function CourseUnsubscribeForm({
  courseId,
  defaultEmail,
}: CourseUnsubscribeProps) {
  const [done, setDone] = useState(false)

  const defaultValues: Partial<FormValues> = {
    email: defaultEmail ?? '',
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit({ email }: FormValues) {
    setDone(true)
    const { error } = await fetchCourseUnsubscribe({ courseId, email })

    if (error) {
      setDone(false)
      return form.setError('email', { message: error.message })
    }
  }

  if (done) {
    return <h3>Unsubscribed from course</h3>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    disabled={done}
                    placeholder="you@email.com"
                    type="email"
                    required
                    {...field}
                  />
                  <Button disabled={done} type="submit">
                    Unsubscribe
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Unsubscribe from the course. You will no longer receive any emails from us
                about this course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function fetchCourseUnsubscribe({
  courseId,
  email,
}: {
  courseId: string
  email: string
}) {
  return jsonFetch<{ success: true }>(`/api/courses/${courseId}/unsubscribe`, {
    method: 'POST',
    data: { email },
  })
}
