import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";

const AVAILABLE_GAMES = [
  "hollow-knight",
  "silksong",
  "elden-ring",
  "alttp",
  "ocarina-of-time",
  "dragon-age-origins",
];

interface Slot {
  name: string;
  game: string;
}

export default function CreateSessionPage() {
  const [slots, setSlots] = useState<Slot[]>([{ name: "", game: "hollow-knight" }]);
  const [port, setPort] = useState(38281);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const addSlot = () =>
    setSlots((s) => [...s, { name: "", game: "hollow-knight" }]);

  const updateSlot = (i: number, field: keyof Slot, value: string) =>
    setSlots((s) => s.map((slot, idx) => (idx === i ? { ...slot, [field]: value } : slot)));

  const handleCreate = async () => {
    const info = await invoke<{ session_id: string; seed: number }>("create_session", {
      config: { slots, port, password: password || null },
    });
    navigate(`/session/${info.session_id}`);
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Nouvelle session</h1>

      <div className="space-y-3 mb-6">
        {slots.map((slot, i) => (
          <div key={i} className="flex gap-3 items-center">
            <span className="text-sm w-16" style={{ color: "var(--color-text-muted)" }}>
              Slot {i + 1}
            </span>
            <input
              className="flex-1 px-3 py-2 rounded text-sm"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)" }}
              placeholder="Nom du joueur"
              value={slot.name}
              onChange={(e) => updateSlot(i, "name", e.target.value)}
            />
            <select
              className="px-3 py-2 rounded text-sm"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)" }}
              value={slot.game}
              onChange={(e) => updateSlot(i, "game", e.target.value)}
            >
              {AVAILABLE_GAMES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          onClick={addSlot}
          className="text-sm px-3 py-1 rounded"
          style={{ color: "var(--color-accent)", border: "1px dashed var(--color-accent)" }}
        >
          + Ajouter un slot
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div>
          <label className="text-sm block mb-1" style={{ color: "var(--color-text-muted)" }}>Port</label>
          <input
            type="number"
            className="px-3 py-2 rounded text-sm w-28"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)" }}
            value={port}
            onChange={(e) => setPort(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-sm block mb-1" style={{ color: "var(--color-text-muted)" }}>Mot de passe (optionnel)</label>
          <input
            className="px-3 py-2 rounded text-sm"
            style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-text)" }}
            placeholder="—"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleCreate}
        className="px-6 py-2 rounded font-medium"
        style={{ background: "var(--color-accent)", color: "white" }}
      >
        Générer &amp; Lancer
      </button>
    </div>
  );
}
