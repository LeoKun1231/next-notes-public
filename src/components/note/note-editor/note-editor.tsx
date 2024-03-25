'use client'
import DeleteButton from '@/components/buttons/delete-button'
import SaveButton from '@/components/buttons/save-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from 'react-dom'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Note } from '@prisma/client'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import NotePreview from '../note-preview/note-preview'

const initalState = {
  message: '',
  success: null,
  id: null
}

export default function NoteEditor({
  saveAction,
  deleteAction,
  note
}: {
  saveAction: any
  deleteAction: any
  note: Note
}) {
  const [saveState, saveFormAction] = useFormState(saveAction, initalState)
  const [deleteState, deleteFormAction] = useFormState(deleteAction, initalState)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(true)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (saveState.success === false) {
      setOpen(true)
      setMessage(saveState.message || '保存失败，请稍后再试')
    } else if (saveState.success === true) {
      redirect(`/note/${saveState.id}`)
    }
  }, [saveState])

  useEffect(() => {
    if (deleteState.success === false) {
      setOpen(true)
      setMessage(deleteState.message || '删除失败，请稍后再试')
    } else if (deleteState.success === true) {
      redirect(`/`)
    }
  }, [deleteState])

  useEffect(() => {
    if (!note.id) {
      setDisabled(false)
    }
    if (Object.keys(note).length >= 4) {
      setTitle(note.title)
      setContent(note.content)
      setDisabled(false)
    }
  }, [note])

  return (
    <>
      <div className="mr-4 flex-1">
        <form>
          <div className="mb-4 flex items-center justify-end">
            <SaveButton formAction={saveFormAction} disabled={disabled} />
            {note.id && <DeleteButton formAction={deleteFormAction} disabled={disabled} />}
          </div>
          <Input type="hidden" value={note.id} name="id" />
          <Input
            placeholder="请输入笔记标题"
            name="title"
            disabled={disabled}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            className="mt-4 h-[calc(100vh-256px)] resize-none"
            placeholder="请输入笔记内容"
            disabled={disabled}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      </div>

      <div className="ml-12 flex-1">
        <Badge className="bg-blue-200 px-8 py-1 text-lg font-bold text-blue-600 hover:bg-blue-200 dark:bg-primary dark:text-white">
          预 览
        </Badge>
        <NotePreview title={title} content={content} />
      </div>

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">提醒</AlertDialogTitle>
            <AlertDialogDescription className="py-4 ">
              {saveState.message || '保存失败，请稍后再试'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center justify-center">
            <AlertDialogAction className="w-[40%] dark:text-white" onClick={() => setOpen(false)}>
              确 定
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
