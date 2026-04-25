# Protocole Réseau Synchro (Compatible Archipelago)

Synchro implémente le protocole WebSocket Archipelago v0.6 intégralement.
Tous les clients Archipelago existants sont compatibles sans modification.

## Paquets Serveur → Client

| Paquet | Champs clés |
|---|---|
| `RoomInfo` | version, seed_name, games[], hint_cost, password |
| `Connected` | team, slot, players[], missing_locations[], checked_locations[], slot_data |
| `ConnectionRefused` | errors[] (InvalidSlot, InvalidGame, InvalidPassword…) |
| `ReceivedItems` | index, items[] (NetworkItem) |
| `PrintJSON` | type (ItemSend, Hint, Chat, Goal, Death…), data[] |
| `DataPackage` | games{} → item_name_to_id, location_name_to_id, checksum |
| `Bounced` | games[], slots[], tags[], data{} |
| `RoomUpdate` | checked_locations[], players[] |

## Paquets Client → Serveur

| Paquet | Champs clés |
|---|---|
| `Connect` | password, game, name, uuid, version, items_handling, tags[] |
| `LocationChecks` | locations[] |
| `StatusUpdate` | status (UNKNOWN/CONNECTED/READY/PLAYING/GOAL) |
| `Say` | text |
| `Sync` | — |
| `Bounce` | games[], slots[], tags[], data{} |
| `LocationScouts` | locations[], create_as_hint (0/1/2) |

## Death Link

```json
// Bounce envoyé à tous les slots ayant le tag "DeathLink"
{
  "cmd": "Bounce",
  "tags": ["DeathLink"],
  "data": {
    "time": 1714000000.0,
    "source": "Alice",
    "cause": "Alice was killed by a Baldur"
  }
}
```

## items_handling flags

| Valeur | Signification |
|---|---|
| `0b001` | Items provenant d'autres mondes |
| `0b010` | Items de son propre monde (nécessite 0b001) |
| `0b100` | Start inventory (nécessite 0b001) |

## NetworkItem flags

| Bit | Signification |
|---|---|
| `0b001` | Progression |
| `0b010` | Useful |
| `0b100` | Trap |
