export type SortOption = "newest" | "oldest" | "az";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="border border-border rounded-md px-3 py-2 text-sm text-ink bg-surface outline-none focus:border-accent transition-colors"
    >
      <option value="newest">جدیدترین</option>
      <option value="oldest">قدیمی‌ترین</option>
      <option value="az">الفبا</option>
    </select>
  );
}