import { useState, useEffect, type FormEvent } from "react";
import type { NoteFormProps } from "../types/Type";

export default function NoteForm({
  editingNote,
  onAdd,
  onUpdate,
  onCancelEdit,
}: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      onUpdate(editingNote.id, { title, content });
    } else {
      onAdd({ title, content });
    }

    setTitle("");
    setContent("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mb-6 bg-surface border border-border rounded-lg p-4"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان"
        className="border border-border rounded-md px-3 py-2 text-ink outline-none focus:border-accent"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="توضیحات"
        rows={3}
        className="border border-border rounded-md px-3 py-2 text-ink outline-none focus:border-accent"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-accent text-white rounded-md py-2 px-4 font-medium hover:bg-accent-hover transition-colors"
        >
          {editingNote ? "ذخیره تغییرات" : "افزودن یادداشت"}
        </button>
        {editingNote && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-md py-2 px-4 font-medium text-ink-soft hover:bg-bg transition-colors"
          >
            انصراف
          </button>
        )}
      </div>
    </form>
  );
}
