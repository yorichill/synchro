use crate::DetectedGame;

const SYNCHRO_STEAM_GAMES: &[(u64, &str, &str)] = &[
    (367520, "hollow-knight", "Hollow Knight"),
    (1030300, "silksong", "Hollow Knight: Silksong"),
    (1245620, "elden-ring", "Elden Ring"),
];

pub fn detect() -> Vec<DetectedGame> {
    // TODO: Sprint 2 — parse Steam libraryfolders.vdf
    // 1. Read registry HKCU\Software\Valve\Steam → InstallPath
    // 2. Parse steamapps/libraryfolders.vdf for all library paths
    // 3. Check for appmanifest_{app_id}.acf in each library
    // 4. Extract installdir from manifest
    vec![]
}
