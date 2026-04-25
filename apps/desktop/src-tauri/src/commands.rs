use detector::DetectedGame;
use serde::{Deserialize, Serialize};

#[tauri::command]
pub async fn detect_games() -> Result<Vec<DetectedGame>, String> {
    Ok(detector::detect_all())
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SessionConfig {
    pub seed: Option<u64>,
    pub slots: Vec<SlotConfig>,
    pub port: u16,
    pub password: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SlotConfig {
    pub name: String,
    pub game: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SessionInfo {
    pub session_id: String,
    pub seed: u64,
}

#[tauri::command]
pub async fn create_session(config: SessionConfig) -> Result<SessionInfo, String> {
    let seed = config.seed.unwrap_or_else(|| rand_seed());
    // TODO: Sprint 2 — load configs, run generator, persist session
    Ok(SessionInfo {
        session_id: format!("{:X}", seed & 0xFFFF),
        seed,
    })
}

#[tauri::command]
pub async fn start_server(session_id: String, port: u16) -> Result<String, String> {
    // TODO: Sprint 1 — spawn SynchroServer on port
    let _ = (session_id, port);
    Ok(format!("127.0.0.1:{}", port))
}

#[tauri::command]
pub async fn stop_server(session_id: String) -> Result<(), String> {
    // TODO: Sprint 1 — send shutdown signal to server task
    let _ = session_id;
    Ok(())
}

#[tauri::command]
pub async fn get_session_state(session_id: String) -> Result<serde_json::Value, String> {
    // TODO: Sprint 2 — read session from storage
    let _ = session_id;
    Ok(serde_json::json!({}))
}

#[tauri::command]
pub async fn load_game_config(game_id: String) -> Result<serde_json::Value, String> {
    // TODO: Sprint 2 — load from packages/game-configs/{game_id}/config.yml
    let _ = game_id;
    Ok(serde_json::json!({}))
}

#[tauri::command]
pub async fn validate_game_config(path: String) -> Result<Vec<String>, String> {
    // TODO: Sprint 2 — validate YAML against JSON-Schema
    let _ = path;
    Ok(vec![])
}

fn rand_seed() -> u64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_nanos() as u64)
        .unwrap_or(42)
}
