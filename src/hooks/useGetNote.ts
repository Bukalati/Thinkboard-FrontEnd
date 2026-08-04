import { useEffect, useState } from "react";
import type { ResponseAllNotes, ResponseNote } from "../types/Type";
import { request } from "../api/notesApi";

export function useGetAllNotes() {
  const [notes, setNotes] = useState<ResponseAllNotes>({
    response: [],
    status: 0,
    success: false,
  });
  useEffect(() => {
    (async () => {
      const data = await request<ResponseAllNotes>(`/notes`);
      setNotes(data);
    })();
  }, []);
  return notes;
}

export function useGetNote(id: string) {
  const [note, setNote] = useState<ResponseNote>();
  useEffect(() => {
    (async () => {
      const data = await request<ResponseNote>(`/notes/${id}`);
      setNote(data);
    })();
  }, []);
  return note;
}
