import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-bg/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-ink">
        Think Board
      </Link>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}