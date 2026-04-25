# Stage 2 — Project Planning

## Objectif du projet

> Livrer un launcher Multiworld rétrocompatible Archipelago, permettant à N joueurs indépendants (chacun sur sa propre sauvegarde) de jouer en session partagée, avec Hollow Knight et Silksong comme jeux pilotes, sans configuration manuelle — développé et maintenu par un seul développeur.

## Stakeholders

| Stakeholder | Type | Intérêt |
|---|---|---|
| Développeur (solo) | Interne | Architecte, dev, QA, designer |
| Communauté Archipelago | Externe | Migration facilitée |
| Communauté Randomizer | Externe | Adoption + contributions open source |
| Streamers | Externe | Overlay OBS intégré |
| Contributeurs GitHub | Externe | Architecture modulaire → ajout de jeux |

## Périmètre

### Dans le scope (MVP)
- Launcher desktop Windows (Tauri + React)
- N joueurs sur leurs propres saves indépendantes
- Compatibilité protocole Archipelago
- Auto-détection Steam + RetroArch + Project64
- Jeux fondateurs : HK, Silksong, ALTTP, OoT, Elden Ring, Dragon Age: Origins
- Session LAN + Internet
- Overlay OBS (Source Navigateur port 38282)
- CI/CD GitHub Actions + Landing page

### Hors scope (futur)
- Support Game Pass (sandbox MSIX trop restrictif)
- Cloud hosting de sessions
- Pathfinder v2 (améliorations post-MVP)
- App mobile
- Support Mac/Linux (Windows d'abord)

## Risques

| # | Risque | Impact | Probabilité | Mitigation |
|---|---|---|---|---|
| R1 | Burnout dev solo | Critique | Haute | Milestones courtes, pauses planifiées |
| R2 | EAC bloque Elden Ring | Élevé | Haute | Mode offline en v1 |
| R3 | DA:O — pas d'API mod | Élevé | Moyenne | Lecture mémoire / DLL injection |
| R4 | Game Pass sandbox | Moyen | Haute | Reporté roadmap future |
| R5 | Protocole AP change | Moyen | Faible | Versionning + tests de conformité |

## Timeline

```
Semaine  1     Phase 0 — Fondations
Semaine 2-3    Phase 1 — Protocole Archipelago
Semaine 4-5    Phase 2 — Détection & Bibliothèque
Semaine 6-10   Phase 3 — HK + Silksong end-to-end
Semaine 11-14  Phase 4 — ALTTP + OoT émulés
Semaine 15-17  Phase 5 — Elden Ring (offline)
Semaine 18-23  Phase 6 — Dragon Age: Origins
Semaine 24     Phase 7 — Clôture, landing page, démo
```

## Critères de succès (MVP)

- `synchro.exe` s'installe en 1 clic sur Windows 10+
- N joueurs lancent une session en moins de 3 minutes
- Chaque joueur reste sur sa propre save
- Client Archipelago officiel peut se connecter à Synchro
- Items échangés en temps réel (< 200ms LAN)
- Overlay OBS fonctionnel
- 0 crash sur session 2h
