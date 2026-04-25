use crate::config::GameConfig;
use anyhow::Result;
use std::collections::HashMap;

pub struct Generator {
    pub seed: u64,
}

impl Generator {
    pub fn new(seed: u64) -> Self {
        Self { seed }
    }

    /// Place items across all worlds using BFS sphere-based logic.
    /// Returns a map of location_id → NetworkItem placement.
    pub fn generate(
        &self,
        configs: &[GameConfig],
    ) -> Result<HashMap<i64, i64>> {
        // TODO: Sprint 2 — full BFS implementation
        // 1. Build reachability graph per world
        // 2. Collect progression items across all worlds
        // 3. Place progression items in reachable locations (sphere 0)
        // 4. Expand reachable set, repeat
        // 5. Fill remaining locations with filler/useful items
        let _ = configs;
        Ok(HashMap::new())
    }
}
