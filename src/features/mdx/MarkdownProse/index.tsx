'use client'
import React from 'react'
import Markdown from 'react-markdown'

export type MarkdownProseProps = {
  markdown: string | undefined
}
const MarkdownProse = ({ markdown }: MarkdownProseProps) => {
  return (
    <Markdown className="prose dark:prose-invert lg:prose-lg">
      {markdown}
    </Markdown>
  )
}

export default MarkdownProse
