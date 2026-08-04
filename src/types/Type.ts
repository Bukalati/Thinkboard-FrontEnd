export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export interface NoteGridProps {
  notes: Note[];
  onDelete: (id: string) => void;
}
