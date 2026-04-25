mod commands;

use tauri::Manager;
use tracing_subscriber::EnvFilter;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::detect_games,
            commands::create_session,
            commands::start_server,
            commands::stop_server,
            commands::get_session_state,
            commands::load_game_config,
            commands::validate_game_config,
        ])
        .run(tauri::generate_context!())
        .expect("error running Synchro");
}
