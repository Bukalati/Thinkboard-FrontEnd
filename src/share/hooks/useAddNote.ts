import type { NoteInput, ResponseNote } from "../../types/Type";
import { request } from "../utils/notesApi";

export default function useAddNote() {
  return async (note: NoteInput, refetch: () => Promise<void>) => {
    await request<ResponseNote>("/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    await refetch();
  };
}
