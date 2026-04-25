import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useNavigate } from "react-router-dom";
import {
  Btn,
  Card,
  Col,
  Row,
  Section,
  Shell,
  Toggle,
} from "../ui/primitives";
import { GAMES } from "../data/games";

interface Slot {
  name: string;
  game: string;
}

const MAX_SLOTS = 8;

export default function CreateSessionPage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [port, setPort] = useState("38281");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const addSlot = () => setSlots((s) => (s.length < MAX_SLOTS ? [...s, { name: "", game: "" }] : s));
  const removeSlot = (i: number) => setSlots((s) => s.filter((_, idx) => idx !== i));
  const updateSlot = (i: number, field: keyof Slot, value: string) =>
    setSlots((s) => s.map((slot, idx) => (idx === i ? { ...slot, [field]: value } : slot)));

  const handleCreate = async () => {
    setSubmitting(true);
    try {
      const info = await invoke<{ session_id: string; seed: number }>("create_session", {
        config: { slots, port: Number(port), password: password || null },
      });
      navigate(`/session/${info.session_id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Shell
      title="Nouvelle session"
      subtitle="Configure les slots, génère un seed, lance le serveur"
      actions={
        <Btn
          variant="primary"
          disabled={slots.length === 0 || submitting}
          onClick={handleCreate}
        >
          {submitting ? "Lancement…" : "Générer & Lancer ↗"}
        </Btn>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <Col gap={18}>
          <Section
            label={`Slots · ${slots.length}/${MAX_SLOTS}`}
            action={
              <Btn
                variant="ghost"
                size="sm"
                disabled={slots.length >= MAX_SLOTS}
                onClick={addSlot}
              >
                + Ajouter un slot
              </Btn>
            }
          >
            {slots.length === 0 ? (
              <Card padding={0} style={{ borderStyle: "dashed" }}>
                <div style={{
                  padding: 32, textAlign: "center",
                  color: "var(--color-text-muted)", fontSize: 13,
                }}>
                  Aucun slot. Ajoute un joueur pour commencer.
                </div>
              </Card>
            ) : (
              <Col gap={8}>
                {slots.map((slot, i) => (
                  <Card key={i} padding={12}>
                    <Row gap={10}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 4,
                        background: "var(--color-bg)",
                        border: "1px solid var(--color-border)",
                        display: "grid", placeItems: "center",
                        fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12,
                        color: "var(--color-text-muted)",
                      }}>{i + 1}</div>
                      <input
                        placeholder={`Joueur ${i + 1}`}
                        value={slot.name}
                        onChange={(e) => updateSlot(i, "name", e.target.value)}
                        style={{
                          flex: 1, background: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 5, padding: "7px 10px",
                          fontSize: 13, color: "var(--color-text)",
                        }}
                      />
                      <select
                        value={slot.game}
                        onChange={(e) => updateSlot(i, "game", e.target.value)}
                        style={{
                          background: "var(--color-bg)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 5, padding: "7px 10px",
                          fontSize: 13, color: "var(--color-text)", minWidth: 180,
                        }}
                      >
                        <option value="">— Choisir un jeu —</option>
                        {Object.entries(GAMES).map(([id, g]) => (
                          <option key={id} value={id}>{g.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeSlot(i)}
                        style={{
                          width: 28, height: 28, borderRadius: 4,
                          border: "1px solid var(--color-border)",
                          background: "transparent", color: "var(--color-text-muted)",
                        }}
                      >×</button>
                    </Row>
                  </Card>
                ))}
              </Col>
            )}
          </Section>

          <Section label="Réseau">
            <Card padding={14}>
              <Row gap={14}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }}>Port</div>
                  <input
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    style={{
                      width: "100%", background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 5, padding: "7px 10px", fontSize: 13,
                      color: "var(--color-text)", fontFamily: "var(--font-mono)",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }}>Mot de passe (optionnel)</div>
                  <input
                    placeholder="—"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%", background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 5, padding: "7px 10px", fontSize: 13, color: "var(--color-text)",
                    }}
                  />
                </div>
              </Row>
            </Card>
          </Section>
        </Col>

        <Col gap={14}>
          <Section label="Seed">
            <Card padding={14}>
              <div style={{
                fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 22,
                color: "var(--color-text-dim)", letterSpacing: -0.5,
              }}>—</div>
              <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 4 }}>
                Sera généré au lancement
              </div>
              <Row gap={6} style={{ marginTop: 10 }}>
                <Btn variant="ghost" size="sm" icon="↻">Générer</Btn>
                <Btn variant="ghost" size="sm" icon="✎">Manuelle</Btn>
              </Row>
            </Card>
          </Section>

          <Section label="Options globales">
            <Card padding={14}>
              <Col gap={10}>
                <Row><Toggle /><span style={{ fontSize: 12.5, marginLeft: 10 }}>Death link</span></Row>
                <Row><Toggle /><span style={{ fontSize: 12.5, marginLeft: 10 }}>Hints automatiques</span></Row>
                <Row><Toggle /><span style={{ fontSize: 12.5, marginLeft: 10 }}>Pièges (traps)</span></Row>
                <Row><Toggle /><span style={{ fontSize: 12.5, marginLeft: 10 }}>Race mode</span></Row>
              </Col>
            </Card>
          </Section>
        </Col>
      </div>
    </Shell>
  );
}
