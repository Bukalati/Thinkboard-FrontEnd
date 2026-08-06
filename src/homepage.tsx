import { useMemo, useState } from "react";
import useDeleteNote from "./share/hooks/useDeleteNote";
import useAddNote from "./share/hooks/useAddNote";
import useUpdateNote from "./share/hooks/useUpdateNote";
import { useToast } from "./share/hooks/useToast";
import { useGetAllNotes } from "./share/hooks/useGetNote";
import type { Note, NoteInput } from "./types/Type";
import Header from "./components/header";
import NoteGrid from "./components/noteGrid";
import Modal from "./components/modal";
import NoteForm from "./components/noteFrom";
import ConfirmDialog from "./components/confirmDialog";
import Toast from "./components/toast";
import type { SortOption } from "./sortselect";
import SearchInput from "./searchInput";
import SortSelect from "./sortselect";

export default function HomePage() {
  const { notes, isloading, error, refetch } = useGetAllNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const deleteNote = useDeleteNote();
  const addNote = useAddNote();
  const updateNote = useUpdateNote();
  const { toast, showToast, clearToast } = useToast();

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q),
    );

    if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      );
    } else if (sortBy === "oldest") {
      result = [...result].sort(
        (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt),
      );
    } else if (sortBy === "az") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title, "fa"));
    }

    return result;
  }, [notes, query, sortBy]);

  function openCreateForm() {
    setEditingNote(null);
    setIsFormOpen(true);
  }

  function openEditForm(note: Note) {
    setEditingNote(note);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingNote(null);
  }

  async function handleAddNote(note: NoteInput) {
    try {
      await addNote(note, refetch);
      closeForm();
      showToast("یادداشت با موفقیت اضافه شد");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "خطایی رخ داد", "error");
    }
  }

  async function handleUpdateNote(id: string, note: NoteInput) {
    try {
      await updateNote(id, note, refetch);
      closeForm();
      showToast("یادداشت با موفقیت ویرایش شد");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "خطایی رخ داد", "error");
    }
  }

  async function confirmDelete() {
    if (!noteIdToDelete) return;
    try {
      await deleteNote(noteIdToDelete, refetch);
      showToast("یادداشت حذف شد");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "خطایی رخ داد", "error");
    } finally {
      setNoteIdToDelete(null);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header>
        <button
          onClick={openCreateForm}
          className="hidden sm:inline-flex bg-accent text-white rounded-md px-4 py-2 font-medium hover:bg-accent-hover transition-colors"
        >
          یادداشت جدید
        </button>
      </Header>

      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchInput value={query} onChange={setQuery} />
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        {isloading && <p className="text-ink-soft">در حال بارگذاری...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!isloading && !error && filteredNotes.length === 0 && query && (
          <p className="text-ink-soft text-sm">
            نتیجه‌ای برای «{query}» پیدا نشد.
          </p>
        )}
        {!isloading && !error && filteredNotes.length > 0 && (
          <NoteGrid
            notes={filteredNotes}
            onDelete={setNoteIdToDelete}
            onEdit={openEditForm}
          />
        )}
      </div>

      <Modal isOpen={isFormOpen} onClose={closeForm}>
        <NoteForm
          editingNote={editingNote}
          onAdd={handleAddNote}
          onUpdate={handleUpdateNote}
          onCancelEdit={closeForm}
        />
      </Modal>

      <ConfirmDialog
        isOpen={noteIdToDelete !== null}
        title="از حذف این یادداشت مطمئنی؟ این کار قابل بازگشت نیست."
        onConfirm={confirmDelete}
        onCancel={() => setNoteIdToDelete(null)}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onDone={clearToast} />
      )}

      <button
        onClick={openCreateForm}
        aria-label="یادداشت جدید"
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent text-white text-2xl flex items-center justify-center shadow-lg"
      >
        +
      </button>
    </div>
  );
}
