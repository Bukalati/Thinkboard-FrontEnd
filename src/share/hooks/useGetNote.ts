import { useEffect, useState } from "react";
import type { ResponseAllNotes, ResponseNote } from "../../types/Type";
import { request } from "../utils/notesApi";

export function useGetAllNotes() {
  // TODO: Use try catch
  const [notes, setNotes] = useState<ResponseAllNotes>({
    response: [],
    status: 0,
    success: false,
  });

  const fetchNotes = async () => {
      const data = await request<ResponseAllNotes>(`/notes`);
      setNotes(data);
    }

  useEffect(() => {fetchNotes()}, [notes]);
  return {notes , refetch : fetchNotes};
}

export function useGetNote(id: string) {
  //TODO: Use try catch
  const [note, setNote] = useState<ResponseNote>();
  useEffect(() => {
    (async () => {
      const data = await request<ResponseNote>(`/notes/${id}`);
      setNote(data);
    })();
  }, []);
  return note;
}
