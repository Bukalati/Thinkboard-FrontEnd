import { request } from "../utils/notesApi";
import type { NoteInput, ResponseNote } from "../../types/Type";

export default function useUpdateNote() {
  return async (id: string, note: NoteInput, refetch: () => Promise<void>) => {
    await request<ResponseNote>(`/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    await refetch();
  };
}
