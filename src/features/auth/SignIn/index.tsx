'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'

const SignIn = () => <Button onClick={() => signIn()}>Sign in</Button>


export default SignIn
