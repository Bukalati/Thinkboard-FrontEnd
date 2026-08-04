import type { NoteGridProps } from "../types/Type";
import NoteCard from "./noteCard";

export default function NoteGrid({ notes, onDelete, onEdit }: NoteGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}