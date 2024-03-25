import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3'])
const allowedAttributes = Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
  img: ['alt', 'src']
})

export function markdownToHtml(markdown?: string) {
  return sanitizeHtml(marked(markdown || '') as string, {
    allowedTags,
    allowedAttributes
  })
}
