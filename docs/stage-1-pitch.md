# Stage 1 — Team Formation & Idea Development

## Pitch Deck

### Team Name & Project Name
- **Projet : Synchro** — Multiworld Randomizer nouvelle génération
- **Équipe :** Développeur solo — projet open source

### Problème identifié
Les outils Multiworld existants (Archipelago) sont inaccessibles au grand public :
- Setup technique lourd (Python, YAML manuel, serveur auto-hébergé)
- Aucune détection automatique des jeux installés
- Zéro support natif des jeux émulés avec les jeux PC natifs
- Interface CLI hostile aux nouveaux joueurs

### Utilisateurs cibles
| Segment | Profil |
|---|---|
| **Primaire** | Joueurs Randomizer (PC, habitués des seeds et rom-hacks) |
| **Secondaire** | Streamers voulant un overlay Multiworld intégré OBS |
| **Tertiaire** | Développeurs souhaitant ajouter leurs propres jeux via plugins |

### Solution proposée
Un launcher desktop unifié permettant à N joueurs (2, 3, 4, illimité) de jouer chacun sur **leur propre sauvegarde** de jeux différents ou identiques, avec les items mélangés entre tous les mondes — sans aucune configuration manuelle.

Synchro est **rétrocompatible avec Archipelago** : tous les jeux déjà supportés par AP fonctionnent immédiatement.

**Exemple concret :**
> Alice joue Hollow Knight sur sa save. Bob joue Elden Ring sur sa save. Alice trouve un item qui appartient au monde de Bob → Synchro le lui envoie automatiquement. Chacun progresse dans son propre jeu, leurs aventures s'entremêlent.

### Les 6 Jeux Fondateurs

| Priorité | Jeu | Plateforme | Dans AP ? |
|---|---|---|---|
| 1 | Hollow Knight | Steam (PC) | ✅ Oui |
| 2 | HK: Silksong | Steam (PC) | ✅ Oui |
| 3 | A Link to the Past | RetroArch / SNES | ✅ Oui |
| 4 | Ocarina of Time | RetroArch / N64 | ✅ Oui |
| 5 | Elden Ring | Steam (PC, offline) | ✅ Oui |
| 6 | Dragon Age: Origins | PC natif | ❌ Exclusivité Synchro |
| Futur | Jeux Game Pass | Xbox/PC | ⚪ Étude de faisabilité |

### MVP Features
- N joueurs, chacun sur sa propre sauvegarde indépendante
- Rétrocompatibilité protocole Archipelago
- Détection automatique Steam + RetroArch + Project64
- Échange d'items en temps réel entre les mondes
- Interface React : liste joueurs, log d'événements
- Overlay OBS (Source Navigateur)

### Planning solo
| Phase | Durée | Livrable |
|---|---|---|
| Phase 0 — Fondations | Sem. 1 | Monorepo + CI + Hello World Tauri |
| Phase 1 — Protocole AP | Sem. 2-3 | Serveur compatible Archipelago |
| Phase 2 — Détection | Sem. 4-5 | Auto-détection Steam + émulateurs |
| Phase 3 — HK + Silksong | Sem. 6-10 | Premiers jeux end-to-end |
| Phase 4 — ALTTP + OoT | Sem. 11-14 | Jeux émulés |
| Phase 5 — Elden Ring | Sem. 15-17 | EAC offline |
| Phase 6 — Dragon Age | Sem. 18-23 | Intégration exclusive |

### Risques & Mitigations
| Risque | Probabilité | Mitigation |
|---|---|---|
| Burnout développeur solo | Haute | Milestones courtes, dev-logs publics |
| EAC bloque Elden Ring | Haute | Mode offline uniquement en v1 |
| DA:O — pas d'API mod | Moyenne | Lecture mémoire / DLL injection |
| Game Pass sandbox bloquant | Haute | Reporté en roadmap future |

### Conclusion
Synchro rend le Multiworld Randomizer accessible à tous. En s'appuyant sur l'écosystème Archipelago et en ajoutant une UX moderne et des jeux exclusifs, chaque release est un livrable concret. Chaque joueur reste maître de sa propre aventure, mais les destins s'entremêlent.
