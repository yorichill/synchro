use std::collections::HashMap;

/// Synchro-exclusive feature: real-time dependency graph and progression hints.
pub struct Pathfinder {
    // location_id → required item IDs
    dependencies: HashMap<i64, Vec<i64>>,
    // item_id → location_id where it is placed
    item_placements: HashMap<i64, i64>,
}

impl Pathfinder {
    pub fn new(
        dependencies: HashMap<i64, Vec<i64>>,
        item_placements: HashMap<i64, i64>,
    ) -> Self {
        Self {
            dependencies,
            item_placements,
        }
    }

    /// Returns ordered chain of (player, location) steps to reach an item.
    /// This is the "reveal full chain" feature.
    pub fn resolve_chain(&self, target_item_id: i64) -> Vec<PathStep> {
        // TODO: Sprint 3 — DFS chain resolution
        let _ = target_item_id;
        vec![]
    }

    /// Returns true if a slot has zero accessible locations left.
    pub fn is_softlocked(&self, checked: &[i64], owned_items: &[i64]) -> bool {
        // TODO: Sprint 3 — BFS reachability check
        let _ = (checked, owned_items);
        false
    }
}

#[derive(Debug, Clone)]
pub struct PathStep {
    pub player_slot: u32,
    pub location_id: i64,
    pub yields_item_id: i64,
    pub yields_for_slot: u32,
}
