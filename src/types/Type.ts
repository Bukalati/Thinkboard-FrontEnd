export interface ResponseAllNotes {
  success: boolean;
  response: Note[];
  status: number;
}

export interface ResponseDeleteNote {
  success: boolean;
  response: string;
  status: number;
}

export interface ResponseNote {
  success: boolean;
  response: Note;
  status: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export interface NoteGridProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export interface NoteFormProps {
  editingNote: Note | null;
  onAdd: (note: Omit<Note, "id">) => void;
  onUpdate: (id: string, note: Omit<Note, "id">) => void;
  onCancelEdit: () => void;
}
