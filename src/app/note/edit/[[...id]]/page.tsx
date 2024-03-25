import NoteEditor from '@/components/note/note-editor/note-editor'
import prisma from '@/lib/db'
import { Note } from '@prisma/client'
import { deleteNote, saveNote } from './action'

export default async function Page({ params }: { params: { id: string[] | undefined } }) {
  const id = Array.isArray(params.id) ? params.id[0] : ''
  // 为了让效果更明显
  let note = {
    id: id ? Number(id) : null
  } as Note

  if (id) {
    const result = await prisma.note.findUnique({ where: { id: Number(id) } })
    if (result) {
      note = result
    }
  }
  return (
    <div className="flex h-full pt-16">
      <NoteEditor saveAction={saveNote} deleteAction={deleteNote} note={note} />
    </div>
  )
}
