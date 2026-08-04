import { useEffect } from "react";
import { request } from "../api/notesApi";
import type { ResponseDeleteNote } from "../types/Type";
import { useGetAllNotes } from "./useGetNote";

export default function useDeleteNote() {
  const del = async (id: string) => {
    console.log("first");
    return await request<ResponseDeleteNote>(`/notes/${id}`, {
      method: "DELETE",
    });
  };

  return del;
}