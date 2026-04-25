import {
  ButtonHTMLAttributes,
  CSSProperties,
  Children,
  HTMLAttributes,
  ReactNode,
  isValidElement,
  useState,
} from "react";
import { GAMES } from "../data/games";

type Variant = "primary" | "ghost" | "subtle" | "danger";
type Size = "sm" | "md" | "lg";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

export function Btn({ children, variant = "primary", size = "md", icon, style, ...rest }: BtnProps) {
  const variants: Record<Variant, { bg: string; fg: string; border: string }> = {
    primary: { bg: "var(--color-accent)", fg: "#fff", border: "transparent" },
    ghost:   { bg: "transparent", fg: "var(--color-text)", border: "var(--color-border)" },
    subtle:  { bg: "var(--color-surface-2)", fg: "var(--color-text)", border: "var(--color-border)" },
    danger:  { bg: "#f8717122", fg: "#f87171", border: "#f8717144" },
  };
  const sizes: Record<Size, CSSProperties> = {
    sm: { padding: "5px 10px", fontSize: 12 },
    md: { padding: "8px 14px", fontSize: 13 },
    lg: { padding: "10px 18px", fontSize: 14 },
  };
  const v = variants[variant];
  return (
    <button
      {...rest}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: v.bg, color: v.fg,
        border: `1px solid ${v.border}`,
        borderRadius: 6, fontWeight: 500,
        ...sizes[size],
        ...(style || {}),
      }}
    >
      {icon && <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9em" }}>{icon}</span>}
      {children}
    </button>
  );
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: number;
}

export function Card({ children, padding = 16, style, ...rest }: CardProps) {
  return (
    <div {...rest} style={{
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
      borderRadius: 8,
      padding,
      ...(style || {}),
    }}>
      {children}
    </div>
  );
}

interface FlexProps {
  children?: ReactNode;
  gap?: number;
  align?: CSSProperties["alignItems"];
  style?: CSSProperties;
}

export function Row({ children, gap = 12, align = "center", style }: FlexProps) {
  return <div style={{ display: "flex", gap, alignItems: align, ...(style || {}) }}>{children}</div>;
}

export function Col({ children, gap = 12, style }: Omit<FlexProps, "align">) {
  return <div style={{ display: "flex", flexDirection: "column", gap, ...(style || {}) }}>{children}</div>;
}

export function Section({ label, children, action }: { label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 10.5, letterSpacing: 1.5, fontWeight: 700,
        color: "var(--color-text-muted)",
        textTransform: "uppercase",
        marginBottom: 10,
      }}>
        <span>{label}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

type BadgeVariant = "success" | "warning" | "error" | "accent" | "info" | "muted";

export function Badge({ children, variant = "accent", size = "sm" }: { children: ReactNode; variant?: BadgeVariant; size?: "xs" | "sm" }) {
  const colors: Record<BadgeVariant, { bg: string; fg: string }> = {
    success: { bg: "#4ade8022", fg: "#4ade80" },
    warning: { bg: "#facc1522", fg: "#facc15" },
    error:   { bg: "#f8717122", fg: "#f87171" },
    accent:  { bg: "#7c6af722", fg: "#7c6af7" },
    info:    { bg: "#60a5fa22", fg: "#60a5fa" },
    muted:   { bg: "var(--color-surface-2)", fg: "var(--color-text-muted)" },
  };
  const c = colors[variant];
  const sz = size === "xs"
    ? { fontSize: 9.5, padding: "1px 6px", letterSpacing: 0.5 }
    : { fontSize: 10.5, padding: "2px 7px", letterSpacing: 0.4 };
  return (
    <span style={{
      background: c.bg, color: c.fg,
      borderRadius: 3, fontWeight: 600,
      textTransform: "uppercase",
      ...sz,
    }}>{children}</span>
  );
}

type Status = "connected" | "playing" | "waiting" | "goal" | "dead" | "offline";

export function StatusDot({ status, pulse = false }: { status: Status; pulse?: boolean }) {
  const map: Record<Status, string> = {
    connected: "#4ade80",
    playing:   "#4ade80",
    waiting:   "#facc15",
    goal:      "#7c6af7",
    dead:      "#f87171",
    offline:   "#5a5a72",
  };
  const c = map[status] ?? "#8888aa";
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
      {pulse && (
        <span style={{
          position: "absolute", inset: -2,
          borderRadius: "50%", background: c, opacity: 0.3,
          animation: "syncro-pulse 1.6s ease-out infinite",
        }} />
      )}
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
    </span>
  );
}

type ItemKind = "progression" | "useful" | "filler" | "trap" | "goal";

export function ItemIcon({ kind = "filler", size = 16 }: { kind?: ItemKind; size?: number }) {
  const map: Record<ItemKind, { bg: string; glyph: string }> = {
    progression: { bg: "#7c6af7", glyph: "◆" },
    useful:      { bg: "#60a5fa", glyph: "●" },
    filler:      { bg: "#8888aa", glyph: "○" },
    trap:        { bg: "#f87171", glyph: "✕" },
    goal:        { bg: "#facc15", glyph: "★" },
  };
  const m = map[kind] ?? map.filler;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size, height: size,
      background: m.bg + "33",
      color: m.bg,
      borderRadius: 3,
      fontSize: size * 0.7,
      fontWeight: 700,
      flexShrink: 0,
    }}>{m.glyph}</span>
  );
}

interface GameCoverProps {
  gameId: string;
  label?: string;
  height?: number;
  ratio?: string;
}

export function GameCover({ gameId, label, height = 96, ratio }: GameCoverProps) {
  const fallback = { name: gameId, short: "?", platform: "", coverA: "#2a2a3a", coverB: "#1a1a24" };
  const g = GAMES[gameId] ?? fallback;
  const style: CSSProperties & Record<string, string | number | undefined> = {
    "--cover-a": g.coverA,
    "--cover-b": g.coverB,
    height: ratio ? undefined : height,
    aspectRatio: ratio,
  };
  return (
    <div className="cover-stripe" style={{
      ...style,
      borderRadius: 6,
      border: "1px solid var(--color-border)",
      display: "flex",
      alignItems: "flex-end",
      padding: "8px 10px",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: 1.5,
      color: "rgba(255,255,255,0.55)",
      textTransform: "uppercase",
      position: "relative",
      overflow: "hidden",
    }}>
      {g.platform && (
        <div style={{
          position: "absolute", top: 8, right: 10,
          fontSize: 9, color: "rgba(255,255,255,0.35)",
        }}>
          {g.platform}
        </div>
      )}
      {label || `${g.short} • COVER`}
    </div>
  );
}

export function Progress({ value, max = 100, color = "var(--color-accent)", height = 4 }: { value: number; max?: number; color?: string; height?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{
      height, background: "var(--color-border)",
      borderRadius: 999, overflow: "hidden",
    }}>
      <div style={{
        width: `${pct}%`, height: "100%",
        background: color, transition: "width 0.3s",
      }} />
    </div>
  );
}

export function Toggle({ on: initial = false, onChange }: { on?: boolean; onChange?: (v: boolean) => void }) {
  const [v, setV] = useState(initial);
  const toggle = () => {
    const next = !v;
    setV(next);
    onChange?.(next);
  };
  return (
    <button onClick={toggle} style={{
      width: 36, height: 20, borderRadius: 999,
      background: v ? "var(--color-accent)" : "var(--color-border)",
      border: "none", padding: 0, position: "relative",
      transition: "background 0.15s",
    }}>
      <span style={{
        position: "absolute", top: 2, left: v ? 18 : 2,
        width: 16, height: 16, borderRadius: "50%",
        background: "#fff", transition: "left 0.15s",
      }} />
    </button>
  );
}

export function Field({ label, placeholder, mono, value, onChange, type = "text" }: { label: string; placeholder?: string; mono?: boolean; value?: string; onChange?: (v: string) => void; type?: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }}>{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: "100%",
          background: "var(--color-bg)",
          border: "1px solid var(--color-border)",
          borderRadius: 6, padding: "8px 12px",
          fontSize: 13, color: "var(--color-text)",
          fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        }}
      />
    </div>
  );
}

export function EmptyState({ title, message, action }: { title: string; message?: string; action?: ReactNode }) {
  return (
    <div style={{
      flex: 1,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 40, textAlign: "center", gap: 10,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 8,
        border: "1px dashed var(--color-border-strong)",
        display: "grid", placeItems: "center",
        color: "var(--color-text-dim)",
        fontFamily: "var(--font-mono)", fontSize: 22,
        marginBottom: 6,
      }}>·</div>
      <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
      {message && <div style={{ fontSize: 13, color: "var(--color-text-muted)", maxWidth: 360 }}>{message}</div>}
      {action && <div style={{ marginTop: 10 }}>{action}</div>}
    </div>
  );
}

export function Shell({ title, subtitle, actions, children, padBody = true }: { title: string; subtitle?: string; actions?: ReactNode; children: ReactNode; padBody?: boolean }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        padding: "22px 28px 18px", gap: 16,
        borderBottom: "1px solid var(--color-border)",
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{title}</h1>
          {subtitle && <div style={{ marginTop: 4, color: "var(--color-text-muted)", fontSize: 13 }}>{subtitle}</div>}
        </div>
        {actions && <Row gap={8}>{actions}</Row>}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: padBody ? "22px 28px" : 0, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  const total = Children.count(children);
  return (
    <Card padding={0}>
      <div style={{
        padding: "10px 16px", borderBottom: "1px solid var(--color-border)",
        fontSize: 11, letterSpacing: 1.2, fontWeight: 700,
        color: "var(--color-text-muted)", textTransform: "uppercase",
      }}>{title}</div>
      {Children.map(children, (c, i) => (
        isValidElement(c) ? (
          <div key={i} style={{ borderBottom: i < total - 1 ? "1px solid var(--color-border)" : "none" }}>
            {c}
          </div>
        ) : null
      ))}
    </Card>
  );
}

export function SettingRow({ label, sub, children }: { label: string; sub?: string; children: ReactNode }) {
  return (
    <Row style={{ padding: "12px 16px", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 13 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>{sub}</div>}
      </div>
      <div>{children}</div>
    </Row>
  );
}
