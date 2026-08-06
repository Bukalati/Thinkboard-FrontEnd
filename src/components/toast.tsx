import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onDone: () => void;
}

export default function Toast({ message, type = "success", onDone }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  const color = type === "success" ? "bg-success" : "bg-danger";

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 ${color} text-white px-4 py-3 rounded-md shadow-lg z-50`}
    >
      {message}
    </div>
  );
}