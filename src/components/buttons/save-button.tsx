'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

export default function SaveButton({ formAction, disabled }: { formAction: any; disabled?: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending || disabled}
      formAction={formAction}
      className="mx-1 rounded-full px-8 py-1 text-lg font-bold text-white"
    >
      {pending ? '保 存 中...' : '保 存'}
    </Button>
  )
}
