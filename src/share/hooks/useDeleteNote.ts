import { request } from "../utils/notesApi";
import type { ResponseDeleteNote } from "../../types/Type";

export default function useDeleteNote() {
  return async (id: string , refetch : ()=>Promise<void>) => {
    return await request<ResponseDeleteNote>(`/notes/${id}`, {
      method: "DELETE",
    });
    refetch()
  };
}