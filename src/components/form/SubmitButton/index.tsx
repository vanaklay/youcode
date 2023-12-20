'use client'
import React from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

const SubmitButton = (props: ButtonProps) => {
  const { pending } = useFormStatus()
  return <Button {...props} disabled={pending} />
}

export default SubmitButton
