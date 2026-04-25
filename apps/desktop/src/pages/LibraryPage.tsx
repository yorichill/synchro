import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";

interface DetectedGame {
  game_id: string;
  name: string;
  install_path: string;
  launcher: string;
}

export default function LibraryPage() {
  const [games, setGames] = useState<DetectedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    invoke<DetectedGame[]>("detect_games")
      .then(setGames)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Bibliothèque</h1>
        <button
          onClick={() => navigate("/session/new")}
          className="px-4 py-2 rounded text-sm font-medium transition-colors"
          style={{ background: "var(--color-accent)", color: "white" }}
        >
          + Créer une session
        </button>
      </div>

      {loading && (
        <p style={{ color: "var(--color-text-muted)" }}>Détection des jeux…</p>
      )}

      {!loading && games.length === 0 && (
        <div
          className="rounded-lg p-8 text-center"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <p style={{ color: "var(--color-text-muted)" }}>
            Aucun jeu compatible détecté.
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
            Assurez-vous que Steam ou vos émulateurs sont installés.
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {games.map((g) => (
          <div
            key={g.game_id}
            className="rounded-lg p-4"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
          >
            <div className="font-medium">{g.name}</div>
            <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
              {g.launcher}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
