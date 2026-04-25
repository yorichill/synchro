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
        use rand::seq::SliceRandom;
        use rand::SeedableRng;
        use rand::rngs::StdRng;
        
        let mut rng = StdRng::seed_from_u64(self.seed);
        let mut placements = HashMap::new();

        for config in configs {
            let mut available_locations: Vec<i64> = config.locations.iter().map(|l| l.id).collect();
            let mut unplaced_items: Vec<i64> = config.items.iter().map(|i| i.id).collect();
            
            // On mélange les emplacements
            available_locations.shuffle(&mut rng);
            unplaced_items.shuffle(&mut rng);

            // TODO: Vrai BFS. Pour la version 1.0 (MVP Hollow Knight),
            // on place simplement aléatoirement en supposant que tout est atteignable.
            // On s'assure qu'on ne dépasse pas les emplacements
            let to_place = unplaced_items.len().min(available_locations.len());
            
            for i in 0..to_place {
                let loc_id = available_locations[i];
                let item_id = unplaced_items[i];
                placements.insert(loc_id, item_id);
            }
        }
        
        Ok(placements)
    }
}
