import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LibraryPage from "./pages/LibraryPage";
import SessionPage from "./pages/SessionPage";
import CreateSessionPage from "./pages/CreateSessionPage";

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<LibraryPage />} />
          <Route path="/session/new" element={<CreateSessionPage />} />
          <Route path="/session/:id" element={<SessionPage />} />
        </Routes>
      </main>
    </div>
  );
}
