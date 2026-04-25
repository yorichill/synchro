interface Event {
  id: string;
  type: string;
  text: string;
  timestamp: number;
}

interface Props {
  events: Event[];
}

const typeIcon: Record<string, string> = {
  item_send: "📦",
  death: "💀",
  goal: "🏆",
  trap: "🪤",
  milestone: "⭐",
  chat: "💬",
};

export default function EventLog({ events }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {events.map((e) => (
        <div key={e.id} style={{ display: "flex", gap: 8, fontSize: 13 }}>
          <span>{typeIcon[e.type] ?? "•"}</span>
          <span style={{ color: "#c8c8e0" }}>{e.text}</span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "#8888aa" }}>
            {new Date(e.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
}
