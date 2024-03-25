'use server'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// 验证结果
const Note = z.object({
  title: z.string().trim().min(1, '标题不能为空').max(20, '标题不能超过20个字符'),
  content: z.string().trim().min(1, '内容不能为空').max(10000, '内容不能超过10000个字符')
})

/**
 * 添加或者编辑笔记
 * @param preState
 * @param formData
 * @returns
 */
export async function saveNote(preState: ActionResult, formData: FormData): Promise<ActionResult> {
  const id = formData.get('id')?.toString()
  const title = formData.get('title')?.toString()
  const content = formData.get('content')?.toString()

  const data = { id, title, content }
  // 验证数据
  const validated = Note.safeParse(data)

  // 验证失败
  if (!validated.success) {
    return {
      message: validated.error.issues.map((callbackfn) => callbackfn.message).join(','),
      success: false
    }
  }

  // 验证成功
  try {
    let noteId = null
    if (id) {
      await prisma.note.update({
        where: {
          id: Number(id)
        },
        data: {
          title,
          content
        }
      })
      noteId = id
    } else {
      const note = await prisma.note.create({
        data: {
          title: validated.data.title,
          content: validated.data.content
        }
      })
      noteId = note.id
    }
    revalidatePath('/', 'layout')

    return {
      message: '保存成功',
      success: true,
      id: noteId + ''
    }
  } catch (error) {
    return {
      message: '保存失败',
      success: false
    }
  }
}

/**
 * 删除笔记
 * @param preState
 * @param formData
 * @returns
 */
export async function deleteNote(preState: ActionResult, formData: FormData) {
  const id = formData.get('id')?.toString()
  if (!id) {
    return {
      message: 'id不能为空',
      success: false
    }
  }
  try {
    await prisma.note.delete({
      where: {
        id: Number(id)
      }
    })
    revalidatePath('/', 'layout')
    return {
      message: '删除成功',
      success: true
    }
  } catch (error) {
    return {
      message: '删除失败',
      success: false
    }
  }
}
