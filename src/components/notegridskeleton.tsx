import NoteSkeleton from "./noteskeleton";

interface NoteGridSkeletonProps {
  count?: number;
}

export default function NoteGridSkeleton({ count = 6 }: NoteGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <NoteSkeleton key={i} />
      ))}
    </div>
  );
}