import { useState } from "react";
import "./App.css";
import type { Note } from "./types/Type";
import NoteGrid from "./components/noteGrid";
import NoteForm from "./components/noteFrom";

const initialNotes: Note[] = [
  { id: "1", title: "Learn React", content: "Today I learned useState" },
  { id: "2", title: "Shopping", content: "Milk, eggs, bread" },
];
export default function App() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  function handleAddNote(newNote: Omit<Note, "id">) {
    const note: Note = { ...newNote, id: crypto.randomUUID() };
    setNotes((newSet) => [note, ...newSet]);
  }

  function haadleDeleteEvents(id: string) {
    setNotes((newSet) => newSet.filter((note) => note.id !== id));
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      <h1 className="text-2xl font-bold text-ink mb-6">Think Board</h1>
      <NoteForm onAdd={handleAddNote} />
      <NoteGrid notes={notes} onDelete={haadleDeleteEvents} />
    </div>
  );
}
