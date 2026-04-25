import { useState } from "react";
import {
  Col,
  SettingRow,
  SettingsGroup,
  Shell,
  Toggle,
} from "../ui/primitives";

const SECTIONS = ["Général", "Réseau", "Détection", "Overlay OBS", "Mods & Bridges", "Avancé"];

export default function SettingsPage() {
  const [active, setActive] = useState(0);

  return (
    <Shell title="Paramètres" subtitle="Préférences locales et configuration réseau">
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
        <Col gap={2}>
          {SECTIONS.map((s, i) => (
            <button
              key={s}
              onClick={() => setActive(i)}
              style={{
                textAlign: "left", padding: "8px 12px", borderRadius: 5, border: "none",
                background: i === active ? "var(--color-accent-dim)" : "transparent",
                color: i === active ? "var(--color-accent)" : "var(--color-text-muted)",
                fontSize: 13, fontWeight: i === active ? 600 : 500,
              }}
            >{s}</button>
          ))}
        </Col>

        <Col gap={20}>
          <SettingsGroup title="Apparence">
            <SettingRow label="Thème" sub="Clair, sombre ou automatique">
              <select style={{
                background: "var(--color-bg)", border: "1px solid var(--color-border)",
                borderRadius: 5, padding: "6px 10px", color: "var(--color-text)", fontSize: 12.5,
              }}>
                <option>Sombre</option><option>Clair</option><option>Système</option>
              </select>
            </SettingRow>
            <SettingRow label="Langue">
              <select style={{
                background: "var(--color-bg)", border: "1px solid var(--color-border)",
                borderRadius: 5, padding: "6px 10px", color: "var(--color-text)", fontSize: 12.5,
              }}><option>Français</option></select>
            </SettingRow>
          </SettingsGroup>

          <SettingsGroup title="Comportement">
            <SettingRow label="Lancer le jeu automatiquement"><Toggle /></SettingRow>
            <SettingRow label="Notifications hors-fenêtre"><Toggle /></SettingRow>
            <SettingRow label="Sons"><Toggle /></SettingRow>
          </SettingsGroup>

          <SettingsGroup title="Pseudo & identité">
            <SettingRow label="Nom d'affichage">
              <input placeholder="—" style={{
                background: "var(--color-bg)", border: "1px solid var(--color-border)",
                borderRadius: 5, padding: "6px 10px", color: "var(--color-text)", fontSize: 12.5, width: 220,
              }} />
            </SettingRow>
          </SettingsGroup>

          <div style={{ fontSize: 11, color: "var(--color-text-dim)", fontFamily: "var(--font-mono)" }}>
            Synchro v0.4.2 · MIT · github.com/yorichill/synchro
          </div>
        </Col>
      </div>
    </Shell>
  );
}
