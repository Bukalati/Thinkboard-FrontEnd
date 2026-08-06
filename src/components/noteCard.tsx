import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { NoteCardProps } from "../types/Type";

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/notes/${note.id}`)}
      className="bg-surface border border-border rounded-lg p-4 cursor-pointer hover:border-border-hover transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-ink">{note.title}</h2>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            aria-label="ویرایش"
            className="p-1.5 rounded-md text-ink-soft hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            aria-label="حذف"
            className="p-1.5 rounded-md text-ink-soft hover:bg-danger/10 hover:text-danger transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <p className="text-sm text-ink-soft mt-1">{note.content}</p>
    </div>
  );
}