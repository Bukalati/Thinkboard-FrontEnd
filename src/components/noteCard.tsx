import type { NoteCardProps } from "../types/Type";

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <h2 className="font-semibold text-ink">{note.title}</h2>
      <p className="text-sm text-ink-soft mt-1">{note.content}</p>
    </div>
  );
}
