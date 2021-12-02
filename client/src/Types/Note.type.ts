export type Note = {
  id?: number
  note: string
  createdAt: Date
  uid: string
}

export type NoteFunction = {
  deleteNote: (uid: string, id: number) => Promise<void>
  addNote: (uid: string, note: Note) => void
}
