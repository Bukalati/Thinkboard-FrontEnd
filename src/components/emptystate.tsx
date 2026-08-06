interface EmptyStateProps {
  onCreateNote: () => void;
}

export default function EmptyState({ onCreateNote }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <p className="text-ink-soft mb-4">هنوز یادداشتی نساختی. اولین فکرتو ثبت کن.</p>
      <button
        onClick={onCreateNote}
        className="bg-accent text-white rounded-md px-5 py-2.5 font-medium hover:bg-accent-hover transition-colors"
      >
        + یادداشت جدید
      </button>
    </div>
  );
}