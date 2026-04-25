import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn, Card, Col, Field, Row, Section, Shell } from "../ui/primitives";

const CODE_LEN = 6;

export default function JoinSessionPage() {
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [slot, setSlot] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const codeChars = useMemo(() => {
    const c = code.toUpperCase().slice(0, CODE_LEN);
    return Array.from({ length: CODE_LEN }, (_, i) => c[i] ?? "");
  }, [code]);

  const handleJoinByCode = () => {
    if (code.length !== CODE_LEN) return;
    navigate(`/session/${code.toUpperCase()}`);
  };

  const handleJoinByAddress = () => {
    if (!address.trim()) return;
    navigate(`/session/${encodeURIComponent(address.trim())}`);
  };

  return (
    <Shell title="Rejoindre une session" subtitle="Entre un code ou une adresse IP">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card padding={20}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: 14 }}>
            Code de session
          </div>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <input
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, CODE_LEN))}
              style={{
                position: "absolute", inset: 0, opacity: 0, width: "100%", height: "100%",
                cursor: "text",
              }}
            />
            <div style={{ display: "flex", gap: 6 }}>
              {codeChars.map((ch, i) => (
                <div key={i} style={{
                  flex: 1, aspectRatio: "1",
                  background: "var(--color-bg)",
                  border: `1px solid ${i === code.length ? "var(--color-accent)" : "var(--color-border)"}`,
                  borderRadius: 6, display: "grid", placeItems: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 28, fontWeight: 700,
                  color: ch ? "var(--color-text)" : "var(--color-text-dim)",
                  transition: "border-color 0.15s",
                }}>{ch || "·"}</div>
              ))}
            </div>
          </div>
          <Btn
            variant="primary"
            disabled={code.length !== CODE_LEN}
            onClick={handleJoinByCode}
            style={{ width: "100%", justifyContent: "center" }}
          >Rejoindre</Btn>
        </Card>

        <Card padding={20}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: 14 }}>
            Connexion directe
          </div>
          <Col gap={12}>
            <Field label="Adresse" mono placeholder="ip:port" value={address} onChange={setAddress} />
            <Field label="Slot" placeholder="Nom du joueur" value={slot} onChange={setSlot} />
            <Field label="Mot de passe (optionnel)" placeholder="—" value={password} onChange={setPassword} />
          </Col>
          <Btn
            variant="ghost"
            disabled={!address.trim()}
            onClick={handleJoinByAddress}
            style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
          >Se connecter</Btn>
        </Card>
      </div>

      <div style={{ marginTop: 22 }}>
        <Section label="Sessions récentes">
          <Card padding={0} style={{ borderStyle: "dashed" }}>
            <div style={{
              padding: 28, textAlign: "center",
              fontSize: 13, color: "var(--color-text-muted)",
            }}>
              Aucune session récente.
            </div>
          </Card>
        </Section>
      </div>
    </Shell>
  );
}
