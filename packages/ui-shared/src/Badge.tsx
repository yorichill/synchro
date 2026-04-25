interface Props {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "accent";
}

const colors = {
  success: { bg: "#4ade8022", text: "#4ade80" },
  warning: { bg: "#facc1522", text: "#facc15" },
  error:   { bg: "#f8717122", text: "#f87171" },
  accent:  { bg: "#7c6af722", text: "#7c6af7" },
};

export default function Badge({ children, variant = "accent" }: Props) {
  const c = colors[variant];
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 4,
      }}
    >
      {children}
    </span>
  );
}
