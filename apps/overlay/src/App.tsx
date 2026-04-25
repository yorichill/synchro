import { useEffect, useState } from "react";

interface Player {
  slot: number;
  name: string;
  game: string;
  status: "connected" | "playing" | "goal" | "offline";
}

interface Event {
  id: number;
  type: "item_send" | "death" | "goal" | "trap" | "milestone";
  text: string;
  timestamp: number;
}

export default function Overlay() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Connect to Synchro internal WS on port 38283 (overlay feed)
    const ws = new WebSocket("ws://localhost:38283/overlay");
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "players") setPlayers(data.players);
      if (data.type === "event") {
        setEvents((e) => [data.event, ...e].slice(0, 8));
      }
    };
    return () => ws.close();
  }, []);

  const statusColor = (s: Player["status"]) => ({
    connected: "#facc15",
    playing: "#4ade80",
    goal: "#7c6af7",
    offline: "#888",
  }[s]);

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        background: "rgba(15,15,19,0.85)",
        borderRadius: 8,
        padding: "12px 16px",
        color: "#e8e8f0",
        minWidth: 260,
        maxWidth: 320,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(124,106,247,0.3)",
      }}
    >
      {/* Header */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#7c6af7", marginBottom: 10 }}>
        SYNCHRO
      </div>

      {/* Players */}
      <div style={{ marginBottom: 10 }}>
        {players.map((p) => (
          <div key={p.slot} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ color: statusColor(p.status), fontSize: 10 }}>●</span>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
            <span style={{ fontSize: 11, color: "#8888aa", marginLeft: "auto" }}>{p.game}</span>
          </div>
        ))}
        {players.length === 0 && (
          <div style={{ fontSize: 12, color: "#8888aa" }}>En attente de joueurs…</div>
        )}
      </div>

      {/* Events */}
      {events.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 8 }}>
          {events.slice(0, 4).map((e) => (
            <div key={e.id} style={{ fontSize: 11, color: "#c8c8e0", marginBottom: 3, opacity: 0.9 }}>
              {e.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
