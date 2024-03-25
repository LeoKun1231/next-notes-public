'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>('')
  const { replace } = useRouter()
  const pathName = usePathname()
  const [isPending, startTransition] = useTransition()

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = e.target.value
    const params = new URLSearchParams()
    if (currentValue) {
      params.set('search', currentValue)
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`)
    })
    setSearchValue(currentValue)
  }

  useEffect(() => {
    setSearchValue('')
  }, [pathName])

  return (
    <div className="flex w-full items-center space-x-2">
      <Input placeholder="请输入笔记标题名称" name="title" value={searchValue} onChange={onSearchChange} />
      <Link href="/note/edit">
        <Button type="submit" className="dark:text-white">
          创建
        </Button>
      </Link>
    </div>
  )
}
