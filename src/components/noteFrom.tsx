import { useState, type FormEvent } from "react";
import type { Note } from "../types/Type";

interface NoteFormProps {
  onAdd: (note: Omit<Note, "id">) => void;
}

export default function NoteForm({ onAdd }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({ title, content });
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
      <button
        type="submit"
        className="bg-accent text-white rounded-md py-2 font-medium hover:bg-accent-hover transition-colors"
      >
        افزودن یادداشت
      </button>
    </form>
  );
}
