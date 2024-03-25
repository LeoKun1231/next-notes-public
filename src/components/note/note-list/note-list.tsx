import prisma from '@/lib/db'
import NoteListFilter from '../note-list-filter/note-list-filter'

export default async function NoteList() {
  const notes = await prisma.note.findMany()

  if (notes.length === 0) {
    return (
      <div className="flex h-[calc(100vh-116px)] items-center justify-center">
        <div className="text-lg font-bold text-gray-500 dark:text-gray-400">No notes found</div>
      </div>
    )
  }

  return (
    <>
      <NoteListFilter notes={notes} />
    </>
  )
}
