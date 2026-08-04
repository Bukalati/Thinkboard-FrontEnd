import { useState } from "react";
import "./App.css";
import type { Note } from "./types/Type";
import NoteGrid from "./components/noteGrid";
import NoteForm from "./components/noteFrom";
import { useGetAllNotes } from "./share/hooks/useGetNote";
import useDeleteNote from "./share/hooks/useDeleteNote";

export default function App() {
  const {notes , refetch} = useGetAllNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const deleteNote = useDeleteNote();
  function handleAddNote(note: Omit<Note, "id">): void {
    throw new Error("Function not implemented.");
  }

  function handleUpdateNote(id: string, note: Omit<Note, "id">): void {
    throw new Error("Function not implemented.");
  }

  function handleDeleteNote(id: string) {
    deleteNote(id , refetch);
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
      <NoteGrid
        notes={notes.response}
        onDelete={handleDeleteNote}
        onEdit={setEditingNote}
      />
    </div>
  );
}
