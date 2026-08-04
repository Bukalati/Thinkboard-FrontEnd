import type { NoteCardProps } from "../types/Type";

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <h2 className="font-semibold text-ink">{note.title}</h2>
      <p className="text-sm text-ink-soft mt-1">{note.content}</p>
      <button
        onClick={() => onDelete(note.id)}
        className="mt-3 text-sm text-danger hover:underline"
      >
        حذف
      </button>
    </div>
  );
}
