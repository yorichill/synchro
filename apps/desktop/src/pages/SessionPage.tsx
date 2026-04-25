import { useParams } from "react-router-dom";

export default function SessionPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Session #{id}</h1>
        <span
          className="text-xs px-2 py-1 rounded"
          style={{ background: "var(--color-success)", color: "#000" }}
        >
          ● Active
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Joueurs */}
        <div
          className="col-span-1 rounded-lg p-4"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-muted)" }}>
            JOUEURS
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            En attente de connexions…
          </p>
        </div>

        {/* Journal */}
        <div
          className="col-span-2 rounded-lg p-4 flex flex-col"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-muted)" }}>
            JOURNAL
          </h2>
          <div className="flex-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Session démarrée. En attente d'événements…
          </div>
        </div>
      </div>
    </div>
  );
}
