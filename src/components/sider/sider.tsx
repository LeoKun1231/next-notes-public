import { NotionLogoIcon } from '@radix-ui/react-icons'
import { Suspense } from 'react'
import Loading from '../common/loading/loading'
import NoteList from '../note/note-list/note-list'
import SearchBar from '../search-bar/search-bar'

export default async function Sider() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className=" flex items-center py-4">
        <NotionLogoIcon className="size-[1.5rem]" />
        <h1 className="ml-2  text-xl font-bold italic ">Next Notes</h1>
      </div>
      <div className="size-full px-6">
        <SearchBar />
        <Suspense
          fallback={
            <div className="flex h-[calc(100%-56px)] w-full items-center justify-center">
              <Loading />
            </div>
          }
        >
          <NoteList />
        </Suspense>
      </div>
    </div>
  )
}
