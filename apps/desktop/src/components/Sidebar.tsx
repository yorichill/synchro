import { NavLink } from "react-router-dom";
import { StatusDot } from "../ui/primitives";

interface NavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

const mainItems: NavItem[] = [
  { to: "/",            label: "Bibliothèque",     icon: "▦", end: true },
  { to: "/session/new", label: "Nouvelle session", icon: "+" },
  { to: "/session/join", label: "Rejoindre",       icon: "→" },
  { to: "/session",     label: "Session active",   icon: "●" },
  { to: "/hints",       label: "Indices",          icon: "?" },
  { to: "/history",     label: "Historique",       icon: "⟲" },
];

const bottomItems: NavItem[] = [
  { to: "/overlay",  label: "Overlay OBS", icon: "▢" },
  { to: "/settings", label: "Paramètres",  icon: "⚙" },
];

function NavGroup({ label, items }: { label?: string; items: NavItem[] }) {
  return (
    <div style={{ marginBottom: 4 }}>
      {label && (
        <div style={{
          fontSize: 9.5, letterSpacing: 1.5, fontWeight: 700,
          color: "var(--color-text-dim)", textTransform: "uppercase",
          padding: "8px 10px 6px",
        }}>{label}</div>
      )}
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.end}
          style={({ isActive }) => ({
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "7px 10px", borderRadius: 5, border: "none",
            background: isActive ? "var(--color-accent-dim)" : "transparent",
            color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
            fontSize: 13, fontWeight: isActive ? 600 : 500, textAlign: "left",
            marginBottom: 1, textDecoration: "none",
          })}
        >
          <span style={{ width: 14, fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.85, textAlign: "center" }}>{it.icon}</span>
          <span>{it.label}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: "var(--color-surface)",
      borderRight: "1px solid var(--color-border)",
      display: "flex", flexDirection: "column",
      padding: "18px 12px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px 18px" }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5,
          background: "var(--color-accent)",
          display: "grid", placeItems: "center",
          fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, color: "#fff",
        }}>S</div>
        <div style={{ fontWeight: 700, letterSpacing: 1, fontSize: 13 }}>SYNCHRO</div>
        <div style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--color-text-dim)" }}>v0.4.2</div>
      </div>

      <NavGroup label="Navigation" items={mainItems} />
      <div style={{ flex: 1 }} />
      <NavGroup items={bottomItems} />

      <div style={{
        marginTop: 12, padding: "10px 8px",
        borderTop: "1px solid var(--color-border)",
        fontSize: 11, color: "var(--color-text-muted)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <StatusDot status="offline" />
        <span>Hors ligne</span>
      </div>
    </aside>
  );
}
