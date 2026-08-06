import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { NoteCardProps } from "../types/Type";
import { formatDate, isToday } from "../share/utils/date";

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
  const navigate = useNavigate();
  const fresh = isToday(note.createdAt);

  return (
    <div
      onClick={() => navigate(`/notes/${note.id}`)}
      className={`group relative bg-surface border border-border rounded-lg p-4 pr-5 cursor-pointer
        hover:border-border-hover hover:-translate-y-0.5 transition-all duration-150
        before:content-[''] before:absolute before:top-0 before:right-0 before:h-full before:w-1 before:rounded-r-lg
        ${fresh ? "before:bg-accent" : "before:bg-border"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-ink">{note.title}</h2>
        <div className="flex gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
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

      <p className="text-sm text-ink-soft mt-1 line-clamp-2">{note.content}</p>

      <p className="font-mono text-xs text-ink-soft/70 mt-3">
        {formatDate(note.createdAt)}
      </p>
    </div>
  );
}
