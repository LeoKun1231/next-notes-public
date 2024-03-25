'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { markdownToHtml } from '@/lib/marked'
import { formatDate } from '@/lib/utils'
import { Note } from '@prisma/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function NoteListFilter({ notes }: { notes: Note[] }) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(search.toLowerCase())
  })

  if (filteredNotes.length === 0) {
    return (
      <div className="flex h-[calc(100vh-116px)] items-center justify-center">
        <div className="text-lg font-bold text-gray-500 dark:text-gray-400">No notes found</div>
      </div>
    )
  }

  return (
    <ScrollArea className="mt-4 h-[calc(100vh-116px)] pr-4">
      <ul>
        <Accordion type="multiple">
          {filteredNotes?.map((note) => (
            <AccordionItem
              className="my-4 rounded-lg bg-[#f1f3f4] px-4 hover:bg-[#cdedfc] dark:bg-[#144a74] dark:hover:bg-[#155ea6] "
              key={note.id}
              value={`${note.id}`}
            >
              <div className="flex items-center justify-between py-2 ">
                <Link href={`/note/${note.id}`}>
                  <div className="flex flex-col items-start ">
                    <div className="font-bold" title={note.title}>
                      {note.title}
                    </div>
                    <div className="text-sm  xl:hidden" title={formatDate(note.createdAt)}>
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                </Link>
                <AccordionTrigger className="font-bold"></AccordionTrigger>
              </div>
              <AccordionContent>
                <div
                  className="break-anywhere text-[#666] dark:text-gray-50"
                  dangerouslySetInnerHTML={{
                    __html:
                      note.content.length >= 200
                        ? markdownToHtml(`${note.content.slice(0, 200)}...`)
                        : markdownToHtml(note.content)
                  }}
                ></div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ul>
    </ScrollArea>
  )
}
