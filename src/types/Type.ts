export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface NoteCardProps {
  note: Note;
}

export interface NoteGridProps {
  notes: Note[];
}
