pub mod steam;
pub mod emulator;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DetectedGame {
    pub game_id: String,
    pub name: String,
    pub install_path: String,
    pub launcher: LauncherType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum LauncherType {
    Steam,
    Cemu,
    Ryujinx,
    RetroArch,
    Project64,
    Native,
}

pub fn detect_all() -> Vec<DetectedGame> {
    let mut games = vec![];
    games.extend(steam::detect());
    games.extend(emulator::detect());
    games
}
