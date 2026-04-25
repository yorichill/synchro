# Stage 4 & 5 — MVP, Post-MVP & Roadmap

> **Rappel :** Hollow Knight est le jeu pilote de validation. Toutes les fonctionnalités fonctionnent avec n'importe quel plugin de jeu.

## Stage 4 — MVP (Sprints)

### Sprint 1 — Protocole Core (Semaines 1-2)
- Monorepo + CI GitHub Actions
- Serveur WebSocket Rust (tokio-tungstenite)
- Paquets AP : Connect, Connected, LocationChecks, ReceivedItems, Sync
- **Release / Collect / Remaining** avec permissions (disabled/enabled/goal/auto)
- **Death Link** — broadcast Bounce tag DeathLink
- **Accessibility** — full / minimal / none au générateur
- UI Hello World (fenêtre Tauri)

### Sprint 2 — Generator & Session (Semaines 3-4)
- Algorithme BFS de génération de seed
- **Progression Balancing** (0-99)
- **Objectif Collectif** — condition de victoire partagée
- **Sync de checkpoint automatique** — snapshot toutes les X minutes
- Reprise de session depuis checkpoint (0 item perdu)
- Hints système (coût, LocationScouts, CreateHints)

### Sprint 3 — Pathfinder Exclusivité Synchro (Semaines 5-7)
- **Graphe de dépendances inter-mondes** (Nœuds/Arêtes cross-slots)
- **Paliers de progression configurables** (25%/50%/75% → tokens)
- **Révélation de chaîne complète** (qui fait quoi, dans quel ordre)
- **Anti-Softlock** — détection automatique d'impasse + hint gratuit
- UI Pathfinder : panneau latéral session

### Sprint 4 — UX & Overlay (Semaines 8-9)
- **Traps** — items négatifs, classification trap, envoi ciblé
- **Overlay OBS** finalisé (Source Navigateur port 38282)
- **Notifications** : item reçu, mort, goal, trap, palier, anti-softlock

### Sprint 5 — Intégration Jeux & QA (Semaines 10-12)
- Hollow Knight (Scarab bridge)
- HK Silksong (même moteur)
- A Link to the Past (RetroArch Lua)
- Ocarina of Time (RetroArch / Project64)
- Elden Ring (mode offline EAC)
- Dragon Age: Origins (DLL / lecture save)
- Suite tests intégration + conformité AP
- Build `.exe` signé + installateur Windows

---

## Stage 5 — Post-MVP / V1.1

| Priorité | Fonctionnalité | Description |
|---|---|---|
| 🔴 | Plando | Placement manuel d'items avant génération |
| 🔴 | Start Inventory | Items de départ configurables par slot |
| 🔴 | Exclude / Priority Locations | Forcer ou exclure des locations |
| 🔴 | Spoiler Log complet | Export texte : playthrough, sphères, paths |
| 🟡 | Item Links | Mutualisation d'items entre slots |
| 🟡 | Triggers | Règles conditionnelles entre options |
| 🟡 | Mode Course | Spoiler masqué, classement temps réel |
| 🟡 | Bounty Board | Récompense en tokens sur un item |
| 🟡 | Historique de session | Replay complet des événements |
| 🟠 | Mode Solo Multiworld | 1 joueur gère N jeux seul |
| 🟠 | Notifications personnalisables | Sons, couleurs, alertes par type |

---

## Roadmap V2 — Futur

| Fonctionnalité | Complexité |
|---|---|
| Groups (slots partagent un inventaire) | Élevée |
| Relay Item (item transite par N joueurs) | Élevée |
| Événements Temporels (défis limités) | Moyenne |
| Spectateur Actif (hints / traps depuis chat) | Moyenne |
| Mode Asymétrique (reçoit sans envoyer) | Haute |
| Badges / Achievements cosmétiques | Faible |
| Support Game Pass (sandbox MSIX) | Très haute |
