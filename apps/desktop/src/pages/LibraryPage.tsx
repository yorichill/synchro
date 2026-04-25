import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";
import { Btn, Card, EmptyState, GameCover, Row, Shell } from "../ui/primitives";

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

  const detect = () => {
    setLoading(true);
    invoke<DetectedGame[]>("detect_games")
      .then(setGames)
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  };

  useEffect(detect, []);

  return (
    <Shell
      title="Bibliothèque"
      subtitle={loading ? "Détection en cours…" : games.length === 0 ? "Aucun jeu détecté pour le moment" : `${games.length} jeu(x) détecté(s)`}
      actions={
        <>
          <Btn variant="ghost" size="sm" icon="↻" onClick={detect}>Lancer la détection</Btn>
          <Btn variant="primary" size="sm" onClick={() => navigate("/session/new")}>+ Nouvelle session</Btn>
        </>
      }
    >
      {!loading && games.length === 0 ? (
        <EmptyState
          title="Aucun jeu détecté"
          message="Lance une détection pour scanner Steam, RetroArch et tes émulateurs. Tu peux aussi ajouter un jeu manuellement."
          action={
            <Row gap={8}>
              <Btn variant="primary" size="sm" icon="↻" onClick={detect}>Détecter maintenant</Btn>
              <Btn variant="ghost" size="sm">Ajouter manuellement</Btn>
            </Row>
          }
        />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {games.map((g) => (
            <Card key={g.game_id} padding={0} style={{ overflow: "hidden" }}>
              <GameCover gameId={g.game_id} ratio="16/10" />
              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{g.name}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
                  {g.launcher}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Shell>
  );
}
