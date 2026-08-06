export default function NoteSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 animate-pulse">
      <div className="h-4 w-2/3 bg-border rounded mb-3" />
      <div className="h-3 w-full bg-border rounded mb-2" />
      <div className="h-3 w-5/6 bg-border rounded" />
    </div>
  );
}