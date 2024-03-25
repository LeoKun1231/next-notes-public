import type { Note } from '@prisma/client'
import { create } from 'zustand'

interface ICreate {
  notes: Note[]
  addNote: (note: Note[]) => void
}

export const useNotesStore = create<ICreate>((set) => ({
  notes: [],
  addNote: (notes) => set((_) => ({ notes }))
}))
