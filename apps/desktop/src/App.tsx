import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LibraryPage from "./pages/LibraryPage";
import SessionPage from "./pages/SessionPage";
import CreateSessionPage from "./pages/CreateSessionPage";
import JoinSessionPage from "./pages/JoinSessionPage";
import HintsPage from "./pages/HintsPage";
import HistoryPage from "./pages/HistoryPage";
import OverlayPage from "./pages/OverlayPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <div
      data-theme="dark"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "var(--color-bg)",
        color: "var(--color-text)",
        fontFamily: "var(--font-sans)",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<LibraryPage />} />
          <Route path="/session/new" element={<CreateSessionPage />} />
          <Route path="/session/join" element={<JoinSessionPage />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/session/:id" element={<SessionPage />} />
          <Route path="/hints" element={<HintsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/overlay" element={<OverlayPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}
