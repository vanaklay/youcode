'use client'

import React, { useState } from 'react'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Lesson } from '@prisma/client'
import SortableLessonItem from '../LessonItem'

type DraggableLessonsProps = {
  lessons?: Lesson[]
  courseId: string
}
const DraggableLessons = ({ lessons, courseId }: DraggableLessonsProps) => {
  const [items, setItems] = useState(lessons)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        if (items) {
          const oldIndex = items.findIndex((item) => item.id === active.id)
          const newIndex = items.findIndex((item) => item.id === over?.id)

          return arrayMove(items, oldIndex, newIndex)
        }
      })
    }
  }

  const uniquesItemIdentifier =
    items?.map((lesson) => ({ id: lesson.id })) ?? []

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={uniquesItemIdentifier}
        strategy={verticalListSortingStrategy}
      >
        {items?.map((lesson) => (
          <SortableLessonItem
            key={lesson.id}
            lesson={lesson}
            courseId={courseId}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default DraggableLessons
