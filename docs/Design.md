# Synchro — Design Document (Source de Vérité)

> Ce document est la référence centrale pour toutes les décisions d'architecture et d'UX de Synchro.

## Principes fondamentaux

1. **Chaque joueur joue sa propre sauvegarde** — jamais de co-op sur la même save.
2. **Zero-Config** — aucune installation manuelle requise.
3. **Rétrocompatibilité AP** — le protocole Archipelago est implémenté intégralement.
4. **Plugin-first** — chaque jeu est un fichier YAML indépendant du moteur.
5. **Solo-friendly** — conçu pour être développé et maintenu par une seule personne.

## Palette de couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--color-bg` | `#0f0f13` | Fond principal |
| `--color-surface` | `#1a1a24` | Cartes, panneaux |
| `--color-border` | `#2a2a3a` | Bordures |
| `--color-accent` | `#7c6af7` | Actions principales, liens actifs |
| `--color-text` | `#e8e8f0` | Texte principal |
| `--color-text-muted` | `#8888aa` | Texte secondaire |
| `--color-success` | `#4ade80` | Connecté, succès |
| `--color-warning` | `#facc15` | En attente |
| `--color-error` | `#f87171` | Erreur, mort |

## IDs des jeux — Plages réservées

| Jeu | Items | Locations |
|---|---|---|
| Hollow Knight | 67000–67999 | 68000–68999 |
| Silksong | 69000–69999 | 70000–70999 |
| Elden Ring | 71000–71999 | 72000–72999 |
| A Link to the Past | 73000–73999 | 74000–74999 |
| Ocarina of Time | 75000–75999 | 76000–76999 |
| Dragon Age: Origins | 77000–77999 | 78000–78999 |
| Réservé futur | 80000+ | 90000+ |

## Ports réseau

| Port | Usage |
|---|---|
| 38281 | Serveur WebSocket Multiworld (protocole AP) |
| 38282 | Serveur web Overlay OBS |
| 38283 | Feed WebSocket interne Overlay |

## Protocole WebSocket

Voir `docs/network-protocol.md` pour la référence complète.
Synchro implémente 100% du protocole Archipelago v0.6+.

## Ajout d'un jeu — Checklist

- [ ] Créer `packages/game-configs/<game-id>/config.yml`
- [ ] Valider contre le schéma JSON : `pnpm validate-config <game-id>`
- [ ] Ajouter l'app_id Steam (si applicable) dans `detector/src/steam.rs`
- [ ] Créer le bridge client (mod, Lua script, ou DLL)
- [ ] Tester une session locale avec 2 bots
- [ ] PR avec vidéo de démonstration
