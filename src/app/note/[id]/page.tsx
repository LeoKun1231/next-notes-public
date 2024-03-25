import NotePreview from '@/components/note/note-preview/note-preview'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function Page({ params }: { params: { id: number } }) {
  const note = await prisma.note.findUnique({
    where: {
      id: params.id / 1
    }
  })
  return (
    <div className="pt-16">
      <div className="flex items-center justify-between">
        <h4 className="text-gray-500 dark:text-[#eee]">
          Last updated on
          <span className="ml-1">{formatDate(note?.createdAt)}</span>
        </h4>
        <Link href={'/note/edit/' + note?.id || ''}>
          <Button className=" dark:text-white">编 辑</Button>
        </Link>
      </div>
      <NotePreview title={note?.title} content={note?.content} />
    </div>
  )
}
