import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 实现lodash中的pick方法
 * @param obj
 * @param keys
 * @returns
 */

export function pick(obj: any, keys: any) {
  return keys.reduce((acc: any, key: any) => {
    if (obj[key] !== undefined) acc[key] = obj[key]

    return acc
  }, {} as any)
}

/**
 * 格式化日期
 * @param date
 * @param format
 * @returns
 */
export function formatDate(date?: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  return dayjs(date).subtract(8, 'hour').format(format)
}
