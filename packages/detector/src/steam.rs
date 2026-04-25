use crate::DetectedGame;

const SYNCHRO_STEAM_GAMES: &[(u64, &str, &str)] = &[
    (367520, "hollow-knight", "Hollow Knight"),
    (1030300, "silksong", "Hollow Knight: Silksong"),
    (1245620, "elden-ring", "Elden Ring"),
];

pub fn detect() -> Vec<DetectedGame> {
    let mut detected = Vec::new();
    
    let steam_dir = match steamlocate::SteamDir::locate() {
        Ok(dir) => dir,
        Err(_) => return detected,
    };

    for &(app_id, game_id, name) in SYNCHRO_STEAM_GAMES {
        if let Ok(Some((app, library))) = steam_dir.find_app(app_id as u32) {
            let install_path = library.resolve_app_dir(&app).display().to_string();
            detected.push(DetectedGame {
                game_id: game_id.to_string(),
                name: name.to_string(),
                install_path,
                launcher: crate::LauncherType::Steam,
            });
        }
    }

    detected
}
