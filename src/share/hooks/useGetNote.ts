import { useEffect, useState } from "react";
import type { Note, ResponseAllNotes, ResponseNote } from "../../types/Type";
import { request } from "../utils/notesApi";

export function useGetAllNotes() {
  // TODO: Use try catch
  // const [notes, setNotes] = useState<ResponseAllNotes>({
  //   response: [],
  //   status: 0,
  //   success: false,
  // });
  const [notes, setNotes] = useState<Note[]>([]);
  const [isloading, setisLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const fetchNotes = async () => {
  //   const data = await request<ResponseAllNotes>(`/notes`);
  //   setNotes(data);
  // };
  async function fetchNotes() {
    setisLoading(true);
    setError(null);
    try {
      const data = await request<ResponseAllNotes>("/notes");
      setNotes(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error");
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    fetchNotes();
  }, []);
  return { notes, isloading, error, refetch: fetchNotes };
}

export function useGetNote(id: string) {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNote() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await request<ResponseNote>(`/notes/${id}`);
        setNote(data.response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "unknown error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  return { note, isLoading, error };
}
