use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameConfig {
    pub name: String,
    pub version: String,
    pub game_id: String,
    pub platform: Platform,
    pub steam_app_id: Option<u64>,
    pub items: Vec<Item>,
    pub locations: Vec<Location>,
    pub regions: Vec<Region>,
    pub options: serde_yaml::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum Platform {
    Steam,
    Emulator,
    Native,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Item {
    pub id: i64,
    pub name: String,
    pub classification: ItemClassification,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum ItemClassification {
    Progression,
    Useful,
    Filler,
    Trap,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Location {
    pub id: i64,
    pub name: String,
    pub region: String,
    pub rules: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Region {
    pub name: String,
    pub connects_to: Vec<RegionConnection>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RegionConnection {
    pub region: String,
    pub rules: Vec<String>,
}

impl GameConfig {
    pub fn from_yaml(yaml: &str) -> Result<Self, serde_yaml::Error> {
        serde_yaml::from_str(yaml)
    }
}
