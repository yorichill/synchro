# Synchro

> Multiworld Randomizer nouvelle génération — Plug & Play, rétrocompatible Archipelago.

Synchro est un système de modification inter-jeux révolutionnaire qui fusionne vos titres préférés en une seule expérience multijoueur unifiée.

## Pourquoi Synchro ?

| Fonctionnalité | Archipelago | Synchro |
|---|---|---|
| Setup | ~45 min (Python, YAML, serveur) | < 2 min |
| Détection des jeux | Manuelle | Automatique (Steam + émulateurs) |
| Jeux émulés + PC natifs | Non | Oui |
| Pathfinder intelligent | Non | ✅ Exclusivité |
| Overlay OBS natif | Non | ✅ Intégré |
| Compatibilité AP | — | ✅ Protocole compatible |

## Jeux supportés

| Jeu | Plateforme | Statut |
|---|---|---|
| Hollow Knight | Steam | ✅ MVP |
| Hollow Knight: Silksong | Steam | ✅ MVP |
| A Link to the Past | RetroArch / SNES | ✅ MVP |
| Ocarina of Time | RetroArch / N64 | ✅ MVP |
| Elden Ring | Steam (offline) | 🟡 Phase 2 |
| Dragon Age: Origins | PC natif | 🟠 Phase 3 |

## Stack technique

- **Backend** : Rust + Tauri 2
- **Frontend** : React 18 + Tailwind CSS
- **Protocole** : WebSocket (compatible Archipelago)
- **Config jeux** : YAML

## Structure du repo

```
/synchro
├── apps/
│   ├── desktop/          # Launcher principal (Tauri)
│   └── overlay/          # Web-app OBS (Source Navigateur)
├── packages/
│   ├── net-server/       # Serveur WebSocket compatible AP
│   ├── engine-generator/ # Génération de seed + Pathfinder
│   ├── detector/         # Détection Steam + émulateurs
│   ├── patcher-core/     # Hash SHA256 + patch ROM
│   ├── game-configs/     # YAML des jeux (items, locations, règles)
│   └── ui-shared/        # Composants React communs
├── docs/                 # Documentation complète (stages 1-5)
└── scripts/              # Utilitaires dev
```

## Démarrage rapide

```bash
# Prérequis : Node 20+, pnpm, Rust stable
bash scripts/setup.sh
pnpm dev
```

## Contribution

Voir [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md). Ajouter un jeu = créer un fichier `packages/game-configs/<game-id>/config.yml`.

## Licence

MIT — voir [`LICENSE`](LICENSE).
