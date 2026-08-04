import type { NoteCardProps } from "../types/Type";

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <h2 className="font-semibold text-ink">{note.title}</h2>
      <p className="text-sm text-ink-soft mt-1">{note.content}</p>
      <div className="flex gap-3 mt-3 text-sm">
        <button onClick={() => onEdit(note)} className="text-accent hover:underline">
          ویرایش
        </button>
        <button onClick={() => onDelete(note.id)} className="text-danger hover:underline">
          حذف
        </button>
      </div>
    </div>
  );
}