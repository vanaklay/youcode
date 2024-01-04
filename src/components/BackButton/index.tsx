import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type BackButtonProps = {
  href: string
}

const BackButton = ({ href }: BackButtonProps) => {
  return (
    <Link href={href} className="flex flex-row">
      <ArrowLeft />
      Back
    </Link>
  )
}

export default BackButton
