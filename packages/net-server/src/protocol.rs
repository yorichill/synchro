use serde::{Deserialize, Serialize};

// ── Archipelago-compatible protocol ──────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "cmd")]
pub enum ServerPacket {
    RoomInfo(RoomInfo),
    Connected(Connected),
    ConnectionRefused(ConnectionRefused),
    ReceivedItems(ReceivedItems),
    PrintJSON(PrintJSON),
    DataPackage(DataPackage),
    Bounced(Bounced),
    RoomUpdate(RoomUpdate),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "cmd")]
pub enum ClientPacket {
    Connect(Connect),
    LocationChecks(LocationChecks),
    StatusUpdate(StatusUpdate),
    Say(Say),
    Sync,
    Bounce(Bounce),
    LocationScouts(LocationScouts),
}

// ── Server → Client ───────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RoomInfo {
    pub version: NetworkVersion,
    pub seed_name: String,
    pub games: Vec<String>,
    pub hint_cost: u32,
    pub location_check_points: u32,
    pub password: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Connected {
    pub team: u32,
    pub slot: u32,
    pub players: Vec<NetworkPlayer>,
    pub missing_locations: Vec<i64>,
    pub checked_locations: Vec<i64>,
    pub slot_data: serde_json::Value,
    pub hint_points: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConnectionRefused {
    pub errors: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ReceivedItems {
    pub index: u32,
    pub items: Vec<NetworkItem>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PrintJSON {
    #[serde(rename = "type")]
    pub msg_type: String,
    pub data: Vec<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DataPackage {
    pub data: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Bounced {
    pub games: Option<Vec<String>>,
    pub slots: Option<Vec<u32>>,
    pub tags: Option<Vec<String>>,
    pub data: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RoomUpdate {
    pub checked_locations: Option<Vec<i64>>,
    pub players: Option<Vec<NetworkPlayer>>,
}

// ── Client → Server ───────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Connect {
    pub password: Option<String>,
    pub game: String,
    pub name: String,
    pub uuid: String,
    pub version: NetworkVersion,
    pub items_handling: u8,
    pub tags: Vec<String>,
    pub slot_data: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LocationChecks {
    pub locations: Vec<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StatusUpdate {
    pub status: ClientStatus,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Say {
    pub text: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Bounce {
    pub games: Option<Vec<String>>,
    pub slots: Option<Vec<u32>>,
    pub tags: Option<Vec<String>>,
    pub data: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LocationScouts {
    pub locations: Vec<i64>,
    pub create_as_hint: u8,
}

// ── Shared structures ─────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkItem {
    pub item: i64,
    pub location: i64,
    pub player: u32,
    pub flags: u8,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkPlayer {
    pub team: u32,
    pub slot: u32,
    pub alias: String,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkVersion {
    pub major: u32,
    pub minor: u32,
    pub build: u32,
    pub class: String,
}

impl Default for NetworkVersion {
    fn default() -> Self {
        Self {
            major: 0,
            minor: 6,
            build: 0,
            class: "Version".into(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum ClientStatus {
    ClientUnknown = 0,
    ClientConnected = 5,
    ClientReady = 10,
    ClientPlaying = 20,
    ClientGoal = 30,
}

// items_handling flags
pub const ITEMS_HANDLING_REMOTE: u8 = 0b001;
pub const ITEMS_HANDLING_OWN_WORLD: u8 = 0b010;
pub const ITEMS_HANDLING_START_INV: u8 = 0b100;
