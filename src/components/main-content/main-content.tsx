import type { ReactNode } from 'react'
import React from 'react'
import { ModeToggle } from '@/components/common/mode-toggle/mode-toggle'

export default function MainContent({ children }: { children: Readonly<ReactNode> }) {
  return (
    <div className="mx-4">
      <div className="flex justify-end py-2">
        <ModeToggle />
      </div>
      <div className="h-[calc(100vh-64px)] rounded-lg bg-white px-20 dark:bg-[#2c456b]">{children}</div>
    </div>
  )
}
