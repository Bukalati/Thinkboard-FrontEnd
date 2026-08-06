import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full sm:w-64">
      <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-ink-soft" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="جستجو در یادداشت‌ها..."
        className="w-full border border-border rounded-md pr-9 pl-3 py-2 text-sm text-ink outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}