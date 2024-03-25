'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

export default function DeleteButton({ formAction, disabled }: { formAction: any; disabled?: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending || disabled}
      variant="destructive"
      formAction={formAction}
      className="mx-1 rounded-full px-8 py-1 text-lg font-bold text-white dark:bg-red-500"
    >
      {pending ? '删 除 中...' : '删 除'}
    </Button>
  )
}
