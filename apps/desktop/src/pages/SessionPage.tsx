import { useNavigate, useParams } from "react-router-dom";
import { Badge, Btn, Card, Col, EmptyState, Row, Section, Shell, StatusDot } from "../ui/primitives";

export default function SessionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return (
      <Shell
        title="Session active"
        subtitle="Aucune session en cours"
        padBody={false}
      >
        <EmptyState
          title="Pas de session en cours"
          message="Crée une nouvelle session, ou rejoins-en une avec un code."
          action={
            <Row gap={8}>
              <Btn variant="primary" size="sm" onClick={() => navigate("/session/new")}>Nouvelle session</Btn>
              <Btn variant="ghost" size="sm" onClick={() => navigate("/session/join")}>Rejoindre</Btn>
            </Row>
          }
        />
      </Shell>
    );
  }

  return (
    <Shell
      title={`Session #${id}`}
      subtitle="En attente de connexions…"
      actions={
        <>
          <Badge variant="success">
            <Row gap={4}><StatusDot status="connected" pulse /> En ligne</Row>
          </Badge>
          <Btn variant="ghost" size="sm">Copier le code</Btn>
          <Btn variant="danger" size="sm">Arrêter</Btn>
        </>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
        <Col gap={16}>
          <Section label="Joueurs">
            <Card padding={0} style={{ borderStyle: "dashed" }}>
              <div style={{
                padding: 20, textAlign: "center",
                fontSize: 12.5, color: "var(--color-text-muted)",
              }}>
                Aucun joueur connecté.
              </div>
            </Card>
          </Section>

          <Section label="Réseau">
            <Card padding={14}>
              <Col gap={6}>
                <Row gap={6}>
                  <span style={{ fontSize: 11, color: "var(--color-text-muted)", width: 60 }}>Port</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>38281</span>
                </Row>
                <Row gap={6}>
                  <span style={{ fontSize: 11, color: "var(--color-text-muted)", width: 60 }}>Code</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: 1 }}>{String(id).slice(0, 6).toUpperCase()}</span>
                </Row>
              </Col>
            </Card>
          </Section>
        </Col>

        <Col gap={16}>
          <Section
            label="Journal"
            action={<Btn variant="ghost" size="sm" icon="↓">Exporter</Btn>}
          >
            <Card padding={0}>
              <div style={{
                padding: 16, minHeight: 280,
                fontFamily: "var(--font-mono)", fontSize: 12,
                color: "var(--color-text-muted)",
                display: "flex", flexDirection: "column", gap: 6,
              }}>
                <span><span style={{ color: "var(--color-text-dim)" }}>[--:--:--]</span> Session démarrée. En attente d'événements…</span>
              </div>
            </Card>
          </Section>
        </Col>
      </div>
    </Shell>
  );
}
