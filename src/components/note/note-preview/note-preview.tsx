import { markdownToHtml } from '@/lib/marked'

export default function NotePreview({ title, content }: { title?: string; content?: string }) {
  return (
    <>
      <h1 className="break-anywhere py-4 text-7xl font-bold">{title}</h1>
      <article className="dark:prose-inver  prose prose-headings:dark:text-white">
        <div
          className="break-anywhere  dark:text-white"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
        ></div>
      </article>
    </>
  )
}
