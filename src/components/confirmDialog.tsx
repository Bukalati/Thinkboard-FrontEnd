import Modal from "./modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ isOpen, title, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <p className="text-ink mb-4">{title}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md text-ink-soft hover:bg-bg transition-colors"
        >
          انصراف
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-danger text-white hover:opacity-90 transition-opacity"
        >
          حذف
        </button>
      </div>
    </Modal>
  );
}