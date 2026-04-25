import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Bibliothèque" },
  { to: "/session/new", label: "Nouvelle session" },
];

export default function Sidebar() {
  return (
    <aside
      className="w-48 flex flex-col gap-1 p-4 border-r"
      style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="text-xl font-bold mb-6" style={{ color: "var(--color-accent)" }}>
        SYNCHRO
      </div>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded text-sm transition-colors ${
              isActive
                ? "bg-[var(--color-accent)] text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </aside>
  );
}
