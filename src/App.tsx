import { Routes, Route } from "react-router-dom";
import HomePage from "./homepage";
import NoteDetailPage from "./notedetailpage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notes/:id" element={<NoteDetailPage />} />
    </Routes>
  );
}