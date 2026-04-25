use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Session {
    pub session_id: String,
    pub seed: u64,
    pub slots: Vec<SlotState>,
    pub hints: Vec<Hint>,
    pub data_storage: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SlotState {
    pub slot: u32,
    pub name: String,
    pub game: String,
    pub team: u32,
    pub status: SlotStatus,
    pub checked_locations: Vec<i64>,
    pub received_items: Vec<i64>,
    pub hint_points: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum SlotStatus {
    Waiting,
    Connected,
    Playing,
    Goal,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Hint {
    pub receiving_player: u32,
    pub finding_player: u32,
    pub location: i64,
    pub item: i64,
    pub found: bool,
}
