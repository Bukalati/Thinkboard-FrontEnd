import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUpdateNote from "./share/hooks/useUpdateNote";
import { useGetNote } from "./share/hooks/useGetNote";
import useDeleteNote from "./share/hooks/useDeleteNote";
import { useToast } from "./share/hooks/useToast";
import type { NoteInput } from "./types/Type";
import Header from "./components/header";
import Modal from "./components/modal";
import NoteForm from "./components/noteFrom";
import ConfirmDialog from "./components/confirmDialog";
import Toast from "./components/toast";
import { Pencil, Trash2 } from "lucide-react";

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { note, isLoading, error, refetch } = useGetNote(id!);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const { toast, showToast, clearToast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  async function handleUpdate(updatedId: string, input: NoteInput) {
    try {
      await updateNote(updatedId, input, refetch);
      setIsFormOpen(false);
      showToast("یادداشت با موفقیت ویرایش شد");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "خطایی رخ داد", "error");
    }
  }

  async function handleDelete() {
    if (!id) return;
    try {
      await deleteNote(id);
      showToast("یادداشت حذف شد");
      navigate("/");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "خطایی رخ داد", "error");
      setIsConfirmOpen(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header>
        {note && (
          <>
            <button
              onClick={() => setIsFormOpen(true)}
              aria-label="ویرایش"
              className="p-2 rounded-md text-ink-soft hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => setIsConfirmOpen(true)}
              aria-label="حذف"
              className="p-2 rounded-md text-ink-soft hover:bg-danger/10 hover:text-danger transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </Header>

      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-accent mb-4 text-sm"
        >
          بازگشت
        </button>

        {isLoading && <p className="text-ink-soft">در حال بارگذاری...</p>}
        {error && <p className="text-danger">{error}</p>}
        {note && (
          <div className="bg-surface border border-border rounded-lg p-6 max-w-2xl">
            <h1 className="text-xl font-bold text-ink mb-3">{note.title}</h1>
            <p className="text-ink-soft whitespace-pre-wrap">{note.content}</p>
          </div>
        )}
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <NoteForm
          editingNote={note ?? null}
          onAdd={() => {}}
          onUpdate={handleUpdate}
          onCancelEdit={() => setIsFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="از حذف این یادداشت مطمئنی؟ این کار قابل بازگشت نیست."
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onDone={clearToast} />
      )}
    </div>
  );
}
