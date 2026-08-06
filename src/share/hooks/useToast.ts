import { useState } from "react";

interface ToastState {
  message: string;
  type: "success" | "error";
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
  }

  function clearToast() {
    setToast(null);
  }

  return { toast, showToast, clearToast };
}