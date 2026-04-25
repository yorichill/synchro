# Stage 3 — Research & Project Design

> **Note architecturale :** Hollow Knight est le jeu pilote de validation uniquement. Le launcher, le serveur, le protocole et la détection fonctionnent indépendamment de tout jeu. Chaque jeu est un plugin isolé (fichier YAML + bridge).

## User Stories

### Hôte (crée la session)
- US-01 : Lancer Synchro sans rien installer manuellement
- US-02 : Voir mes jeux détectés automatiquement
- US-03 : Créer une session avec N slots joueurs
- US-04 : Choisir un jeu différent par slot
- US-05 : Générer un seed et le partager en 1 clic
- US-06 : Voir en temps réel quels joueurs sont connectés
- US-07 : Reprendre une session après un crash

### Joueur (rejoint)
- US-08 : Rejoindre avec un code ou une IP
- US-09 : Lancer mon jeu depuis Synchro
- US-10 : Voir les items que j'envoie et reçois
- US-11 : Utiliser mon client Archipelago existant
- US-12 : Recevoir des hints sur mes items manquants
- US-13 : Overlay dans mon stream OBS

### Contributeur (ajoute un jeu)
- US-14 : Définir un jeu via un fichier YAML
- US-15 : Valider mon YAML contre un schéma JSON
- US-16 : Tester ma config en session locale

## Architecture Système

```
SYNCHRO LAUNCHER
├── Frontend React       ←IPC→  Backend Rust/Tauri
│   ├── LibraryPage              ├── detector/
│   ├── CreateSessionPage        ├── engine-generator/
│   ├── SessionPage              ├── net-server/ (WebSocket)
│   └── Overlay (port 38282)     └── game-configs/ (YAML)
│
└── Clients (WebSocket port 38281)
    ├── Mod Hollow Knight (C# / Scarab)
    ├── Mod Silksong (C#)
    ├── Bridge RetroArch (Lua)
    └── Client Archipelago officiel (compatible)
```

## Schéma Game Config (YAML)

```yaml
name: string           # Nom affiché
game_id: string        # kebab-case unique
platform: steam|emulator|native
steam_app_id: int?     # Si Steam
emulator: string?      # Si émulateur

items:
  - id: int            # Unique global par jeu
    name: string
    classification: progression|useful|filler|trap

locations:
  - id: int
    name: string
    region: string
    rules: string[]    # Ex: ["Hookshot && Bombs"]

regions:
  - name: string
    connects_to:
      - region: string
        rules: string[]

options:
  <option_name>:
    type: toggle|choice|range
    default: any
```

## Diagramme de séquence — Échange d'item

```
Jeu Alice → Client Alice → Serveur Synchro → Client Bob → Jeu Bob
    │              │               │               │           │
    │ Check loc    │               │               │           │
    │─────────────►│ LocationChecks│               │           │
    │              │──────────────►│               │           │
    │              │               │ item → Bob    │           │
    │              │               │──────────────►│ReceivedItem
    │              │ PrintJSON     │               │───────────►
    │              │◄──────────────│               │           │
```

## API Tauri (IPC)

| Commande | Retour | Description |
|---|---|---|
| `detect_games` | `Vec<DetectedGame>` | Scan Steam + émulateurs |
| `create_session` | `SessionInfo` | Crée + génère |
| `start_server` | `ip:port` | Lance WebSocket |
| `stop_server` | — | Arrête proprement |
| `get_session_state` | `SessionState` | État temps réel |
| `load_game_config` | `GameConfig` | Charge un YAML |
| `validate_game_config` | `Vec<Error>` | Valide un YAML |

## SCM

```
main  ← Production stable, protégée
  └── dev  ← Intégration continue
        ├── feat/net-server
        ├── feat/detector-steam
        └── fix/websocket-reconnect
```

Conventions commits : `feat(scope): description` / `fix(scope): description`

## QA

| Niveau | Outil | Cible |
|---|---|---|
| Unitaire Rust | `cargo test` | Generator, protocol, patcher |
| Unitaire JS | `vitest` | Composants React |
| Intégration | Bots Rust | 2 clients s'échangent des items |
| Conformité AP | Client AP officiel | Connexion sans modification |
| E2E | Manuel + vidéo | Session complète avec vrai jeu |
