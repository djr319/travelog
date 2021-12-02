export type Note = {
  id?: number
  note: string
  createdAt: Date
  userId: number
}

export type NoteFunction = {
  deleteNote: (id: number) => Promise<void>
  addNote: (note: Note) => void
}
