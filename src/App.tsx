import { useState } from "react";
import "./App.css";
import type { Note, NoteInput } from "./types/Type";
import NoteGrid from "./components/noteGrid";
import NoteForm from "./components/noteFrom";
import { useGetAllNotes } from "./share/hooks/useGetNote";
import useDeleteNote from "./share/hooks/useDeleteNote";
import useAddNote from "./share/hooks/useAddNote";
import useUpdateNote from "./share/hooks/useUpdateNote";

export default function App() {
  const { notes, isloading, error, refetch } = useGetAllNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const deleteNote = useDeleteNote();
  const addNote = useAddNote();
  const updateNote = useUpdateNote();

  async function handleAddNote(note: NoteInput) {
    await addNote(note, refetch);
  }

  async function handleUpdateNote(id: string, note: NoteInput) {
    await updateNote(id, note, refetch);
    setEditingNote(null);
  }

  async function handleDeleteNote(id: string) {
    await deleteNote(id, refetch);
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      <h1 className="text-2xl font-bold text-ink mb-6">Think Board</h1>

      <NoteForm
        editingNote={editingNote}
        onAdd={handleAddNote}
        onUpdate={handleUpdateNote}
        onCancelEdit={() => setEditingNote(null)}
      />

      {isloading && <p className="text-ink-soft">در حال بارگذاری...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isloading && !error && (
        <NoteGrid
          notes={notes}
          onDelete={handleDeleteNote}
          onEdit={setEditingNote}
        />
      )}
    </div>
  );
}
